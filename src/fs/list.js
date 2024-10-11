import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files');

const list = async () => {
    fs.readdir(filePath, (err, files) => {
        if (err) {
            if (err.code === 'ENOENT') {
                throw new Error('FS operation failed');
            }
            console.log(err);
            return;
        }
        for (const file of files) {
            console.log(file);
        }
    });
};

await list();