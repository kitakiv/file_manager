import fs from 'node:fs/promises';
import path from 'path';


const create = async (fileName) => {
    const filePath = path.normalize(fileName);
    try {
        await fs.writeFile(filePath, '');
    } catch (err) {
        console.error('Operation failed');
    }
};

export default create;