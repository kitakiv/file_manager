import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'wrongFilename.txt');
const newFilePath = path.join(__dirname, 'files', 'properFilename.md');


const rename = async () => {
    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            throw new Error('FS operation failed');
        }
    });
};

await rename();