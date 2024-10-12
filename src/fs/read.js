import fs from 'fs';
import process from 'process';
import path from 'path';
 const read = async (fileToRead) => {
    const filePath = path.normalize(fileToRead);
    try {
        const readStream = fs.createReadStream(filePath);
        for await (const chunk of readStream) {
            process.stdout.write(chunk);
        }
    } catch (err) {
        console.error('Operation failed');
    }

};

export default read