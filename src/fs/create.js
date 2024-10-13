import fs from 'node:fs/promises';
import path from 'path';


const create = async (fileName) => {
    try {
        const filePath = path.normalize(fileName);
        await fs.writeFile(filePath, '');
    } catch (err) {
        console.error('Operation failed');
    }
};

export default create;