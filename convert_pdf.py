import fitz
import sys

def convert_pdf_to_png(pdf_path, output_path):
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)  # first page
    pix = page.get_pixmap(dpi=300)
    pix.save(output_path)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    convert_pdf_to_png(sys.argv[1], sys.argv[2])
