import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs/promises';

const move = async (filePath, newFilePath) => {
    const fromPath = path.normalize(filePath);
    const toPath = path.normalize(newFilePath);
    try {

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