
import path from 'path';
import fs from 'node:fs/promises';


const rename = async (filepath, newFilePath) => {
    let fromPath = filepath;
    let toPath = newFilePath;
    fromPath = path.normalize(filepath);
    toPath = path.normalize(newFilePath);
    try {
        await fs.rename(fromPath, toPath);
    } catch (err) {
        throw new Error('Operation failed');
    }
};

export default rename;