import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

const calculateHash = async (filePath) => {
    try {
        const pathToRead = path.normalize(filePath);
        const hash = createHash('sha256');

        const input = createReadStream(pathToRead);
        for await (const chunk of input) {
            hash.update(chunk);
        }
        console.log(hash.digest('hex'));
    } catch (err) {
        console.error('Operation failed');
    }
};

export default calculateHash;