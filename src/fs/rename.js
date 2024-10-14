
import path from 'path';
import fs from 'node:fs/promises';


const rename = async (filepath, newFilePath) => {
    try {
        const fromPath = path.normalize(filepath);
        const toPath = path.normalize(newFilePath);
        await fs.rename(fromPath, toPath);
    } catch (err) {
        throw new Error('Operation failed');
    }
};

export default rename;