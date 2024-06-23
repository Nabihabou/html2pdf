import { html2pdf } from "html2pdf"
import fs from "fs/promises"
import path from "path"

/** Example Utility */
async function savePdf(folder, filename, pdf) {
    try {
        await fs.mkdir(folder, { recursive: true });
        await fs.writeFile(path.join(folder, `${filename}.pdf`), pdf);
    } catch (error) {
        console.error(error);
    }
}

const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        h1 {
            color: green;
        }
    </style>
</head>

<body>
    <h1>Hello world</h1>
</body>

</html>
`

const page = "https://scottspence.com/posts/use-chrome-in-ubuntu-wsl"

/** Generate PDF using html string */
const buffer1 = await html2pdf(html, {
    format: 'A4',
})

savePdf('output', `example-1`, buffer1)
    .then(() => console.log('PDF 1 saved'))
    .catch(console.error)

/** Generate PDF using page URL */
const buffer2 = await html2pdf(page, {
    format: 'A4',
})

await savePdf('output', `example-2`, buffer2)
console.log('PDF 2 saved')