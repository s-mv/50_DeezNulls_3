import { readFile, writeFile, existsSync, mkdirSync, readdirSync, rmdirSync } from 'fs';
import { promisify } from 'util';
import { spawn } from 'child_process';
import { createWorker } from 'tesseract.js';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

async function pdfToImages(pdfPath, outputPath) {
    const pdfPoppler = spawn('pdfimages', ['-png', pdfPath, outputPath]);
    return new Promise((resolve, reject) => {
        pdfPoppler.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`pdfimages process exited with code ${code}`));
            }
        });
    });
}

async function imagesToText(imagesPath) {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const texts = [];
    for (let i = 0; i < imagesPath.length; i++) {
        const { data: { text } } = await worker.recognize(imagesPath[i]);
        texts.push(text);
    }
    await worker.terminate();
    return texts;
}

async function pdfToText(pdfPath) {
    const tempDir = 'temp';
    const imagesPath = [];
    try {
        if (!existsSync(tempDir)) {
            mkdirSync(tempDir);
        }
        await pdfToImages(pdfPath, tempDir);
        const imageFiles = readdirSync(tempDir).filter(file => file.endsWith('.png'));
        for (const imageFile of imageFiles) {
            imagesPath.push(`${tempDir}/${imageFile}`);
        }

        const texts = await imagesToText(imagesPath);
        return texts.join('\n');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (existsSync(tempDir)) {
            rmdirSync(tempDir, { recursive: true });
        }
    }
}

const pdfFilePath = 'example.pdf';
pdfToText(pdfFilePath).then((text) => {
    console.log('Extracted text:', text);
}).catch((error) => {
    console.error('Error:', error);
});
