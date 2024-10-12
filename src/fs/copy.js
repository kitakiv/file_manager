
import path from 'path';
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';


const copy = async (filePath, newFilePath) => {

    const fromPath = path.normalize(filePath);
    const toPath = path.normalize(newFilePath);
    try {

        await pipeline(
            fs.createReadStream(fromPath),
            fs.createWriteStream(toPath, { flag: 'wx' })
        );
    } catch (err) {
        console.error('Operation failed');
    }

}

export default copy;
