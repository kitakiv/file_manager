
import path from 'path';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';


const copy = async (filePath, newFilePath) => {
    try {
        const fromPath = path.normalize(filePath);
        const toPath = path.normalize(newFilePath);
        await pipeline(
            fs.createReadStream(fromPath),
            fs.createWriteStream(toPath, { flag: 'wx' })
        );
    } catch (err) {
        console.error('Operation failed');
    }

}

export default copy;
