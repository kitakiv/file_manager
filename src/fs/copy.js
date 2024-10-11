import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { mkdir } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileSrc = path.join(__dirname, 'files');
const filesDir = path.join(__dirname, 'files_copy');

async function copyFile() {
    await mkdir(filesDir, { recursive: true });

    fs.readdir(fileSrc, (err, files) => {
        if (err) {
           console.error(err);
           return;
        }
        files.forEach((file) => {
            const src = path.join(fileSrc, file);
            const dest = path.join(filesDir, file);
            fs.copyFile(src, dest, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
    })
}

async function copyDirectory(src) {
    fs.stat(filesDir, async (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                await copyFile()


            } else {
                console.error(err);
            }
            return;
        }
        throw new Error('FS operation failed');
    })
}
const copy = async () => {
    fs.stat(fileSrc, async (err, stats) => {
        if (err) {
            throw new Error('FS operation failed');
        }
        if (stats.isDirectory()) {
            await copyDirectory(fileSrc);
        }
    })
};



await copy();
