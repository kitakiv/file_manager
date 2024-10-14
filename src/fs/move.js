import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs/promises';

const move = async (filePath, newFilePath) => {
    try {
        const fromPath = path.normalize(filePath);
        const toPath = path.normalize(newFilePath);
        await pipeline(
           createReadStream(fromPath),
            createWriteStream(toPath, { flag: 'wx' })
        );
        await fs.unlink(fromPath);

    } catch (err) {
        console.error('Operation failed');
    }
};

export default move;