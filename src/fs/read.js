import fs from 'fs';
import process from 'process';
import path from 'path';

export const read = async (fileToRead, dirname) => {
    let filePath;
    if (path.isAbsolute(fileToRead || '')) {
        filePath = fileToRead;
    } else {

        filePath = path.join(dirname || import.meta.url, fileToRead || '');
    }
    filePath = path.normalize(filePath);
    console.log(filePath);
    try {
        const readStream = fs.createReadStream(filePath);
        for await (const chunk of readStream) {
            process.stdout.write(chunk);
        }
    } catch (err) {
        console.error('Operation failed');
    }

};

await read();