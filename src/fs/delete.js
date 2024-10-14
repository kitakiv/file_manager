import fs from 'node:fs/promises';
import path from 'path';

const remove = async (filePath) => {
    try {
        const pathToFile = path.normalize(filePath);
        await fs.unlink(pathToFile);
    } catch (err) {
        console.error('Operation failed');
    }
};

export default remove;