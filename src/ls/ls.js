import fs from 'node:fs/promises';
import path from 'path';


const listOfFiles = async (filePath) => {
    try {
        const pathToRead = path.normalize(filePath);
        const files = await fs.readdir(pathToRead, { withFileTypes: true })
            .then(files => files.map(file => {
                return {
                    Name: file.name,
                    Type: file.isDirectory() ? 'directory' : 'file'
                }
            }));
        files.sort((a, b) => {
            if (a.Type === 'directory' && b.Type === 'file') {
                return -1;
            }
            if (a.Type === 'file' && b.Type === 'directory') {
                return 1;
            }
            if (a.Type === 'file' && b.Type === 'file') {
                if (a.Name.startsWith('.') && !b.Name.startsWith('.')) {
                    return -1;
                }
                if (!a.Name.startsWith('.') && b.Name.startsWith('.')) {
                    return 1;
                }
                return a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1;
            }
            if (a.Type === 'directory' && b.Type === 'directory') {
                if (a.Name.startsWith('.') && !b.Name.startsWith('.')) {
                    return -1;
                }
                if (!a.Name.startsWith('.') && b.Name.startsWith('.')) {
                    return 1;
                }
                return a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1;
            }
        })
        console.table(files);
    } catch (err) {
        console.error('Operation failed');
    }
}

export default listOfFiles;