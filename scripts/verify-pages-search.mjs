import { existsSync, readFileSync } from "node:fs";

for (const lang of ["en", "ar"]) {
  const searchFile = `out/${lang}/search.html`;
  const homeFile = `out/${lang}.html`;

  if (!existsSync(searchFile)) {
    throw new Error(`Missing exported search page: ${searchFile}`);
  }

  if (!existsSync(homeFile)) {
    throw new Error(`Missing exported home page: ${homeFile}`);
  }

  const homeHtml = readFileSync(homeFile, "utf8");
  const expectedAction = `action="/venus-alarbeed/${lang}/search.html"`;

  if (!homeHtml.includes(expectedAction)) {
    const foundActions = homeHtml.match(/action="[^"]*search[^"]*"/g) ?? [];
    throw new Error(
      `Expected ${expectedAction} in ${homeFile}; found ${foundActions.join(", ") || "no search form action"}`,
    );
  }
}

console.log("Verified GitHub Pages search exports and form actions.");
