# html2pdf

A simple, efficient library for converting HTML strings or web pages into PDF files using Puppeteer. This package is designed to be easy to use for generating PDFs from HTML content or live web pages.

## Features

- Convert HTML strings to PDF.
- Convert web pages to PDF by URL.
- Customizable PDF generation options.
- Built with Puppeteer for reliable rendering.

## Installation

Ensure you have Node.js version 18.0.0 or higher installed. Then, you can install `html2pdf` using your package manager:

```sh
pnpm add html2pdf
# or
npm install html2pdf
```

## Usage

#### HTML to PDF

```javascript
import { html2pdf } from "html2pdf";

const htmlContent = `<html><body><h1>Hello, world!</h1></body></html>`;

html2pdf(htmlContent, { format: 'A4' })
    .then(pdfBuffer => {
        console.log('PDF Generated');
        // Save or use the PDF buffer
    })
    .catch(console.error);
```

#### Web Page to PDF

The HTML content will be considered a web page if the string starts with ```http://``` ```https://```

```javascript
import { html2pdf } from "html2pdf";

const pageUrl = "https://example.com";

html2pdf(pageUrl, { format: 'A3' })
    .then(pdfBuffer => {
        console.log('PDF Generated');
        // Save or use the PDF buffer
    })
    .catch(console.error);
```