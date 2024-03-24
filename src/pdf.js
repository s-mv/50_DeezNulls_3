import { readFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist';

const pdfFilePath = "src/Kushl_resume.pdf";

const data = new Uint8Array(readFileSync(pdfFilePath));

getDocument(data).promise.then((pdf) => {
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then((page) => {
            page.getTextContent().then((content) => {
                content.items.forEach((item) => {
                    text += item.str + ' ';
                });
                console.log(text);
            });
        });
    }
}).catch((error) => {
    console.error('Error:', error);
});
