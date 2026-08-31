const fs = require('fs');
const pdf2img = require('pdf-img-convert');

async function convert() {
  try {
    const pdfArray = await pdf2img.convert('public/venus_portrait.pdf', {
      width: 1200, // Good resolution
      page_numbers: [1]
    });
    
    fs.writeFileSync('public/venus_portrait.png', pdfArray[0]);
    console.log('Successfully converted PDF to PNG!');
  } catch (err) {
    console.error('Error converting PDF:', err);
  }
}

convert();
