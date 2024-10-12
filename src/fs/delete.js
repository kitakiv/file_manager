import fs from 'node:fs/promises';
import path from 'path';

const remove = async (filePath) => {
    const pathToFile = path.normalize(filePath);
    try {
        await fs.unlink(pathToFile);
    } catch (err) {
        console.error('Operation failed');
    }
};

export default remove;