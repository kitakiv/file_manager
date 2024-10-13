import zlib from 'node:zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';
import fs from 'node:fs/promises';


const compress = async (filePath, newFilePath) => {
    try {
        const fromPath = path.normalize(filePath);
        const toPath = path.normalize(newFilePath);
        await pipeline(
            createReadStream(fromPath),
            zlib.createBrotliCompress(),
            createWriteStream(toPath)
        );
        await fs.unlink(fromPath);
    } catch (err) {
        console.error('Operation failed.');
    }
};

export default compress;