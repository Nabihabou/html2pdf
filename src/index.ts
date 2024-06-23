import puppeteer, { type PDFOptions } from "puppeteer";

export { html2pdf };

const args = [
  '--disable-gpu',
  '--disable-dev-shm-usage',
  '--disable-setuid-sandbox',
  '--no-first-run',
  '--no-sandbox',
  '--no-zygote',
  '--single-process',
];

/**
 * Converts HTML content to a PDF file using Puppeteer.
 * 
 * This function can take either a URL or a string of HTML content and uses Puppeteer to generate a PDF.
 * The `opts` parameter allows for customization of the PDF generation process, including Puppeteer launch options
 * and PDF options such as format, margin, etc.
 * 
 * @param {string} content - The HTML content or URL to be converted into a PDF.
 * @param {PDFOptions} opts - Options for PDF generation and Puppeteer configuration.
 * @returns {Promise<Buffer>} A promise that resolves with the PDF content as a Buffer.
 * 
 * @example
 * // Convert a URL to PDF with default options
 * html2pdf('https://example.com').then(pdfBuffer => {
 *   fs.writeFileSync('website.pdf', pdfBuffer);
 * });
 * 
 * @example
 * // Convert an HTML string to PDF with custom options
 * const htmlContent = `<html><body><h1>Hello, world!</h1></body></html>`;
 * html2pdf(htmlContent, options).then(pdfBuffer => {
 *   console.log('PDF Generated');
 * });
 */
async function html2pdf(content: string, opts?: PDFOptions) {
  const browser = await puppeteer.launch({
    args,
    ...opts,
  });
  const page = await browser.newPage();

  let url = !!content.startsWith("http://") || !!content.startsWith("https://");

  if(url) {
    await page.goto(content, {
      waitUntil:[ 'load', 'networkidle0'], // wait for page to load completely
    });
  } else {
    await page.setContent(content, {
      waitUntil: 'networkidle0',
    });
  }

  const pdf = await page.pdf(opts)
  await browser.close();

  return pdf
}

