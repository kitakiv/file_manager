import path from 'path';
import os from 'os';
import fs from 'node:fs/promises';

const goUpDirectory = async(directory) => {
    let pathUp = path.normalize(directory);
    if (pathUp === path.parse(pathUp).root) {
        return pathUp;
    }
    pathUp = path.resolve(pathUp, '..');
    return pathUp;
}

const changeDirectory = async(directory, newDirectory) => {
    let pathFrom = path.normalize(directory);
    const pathTo = path.normalize(newDirectory);
    try {
        const pathCd = path.resolve(pathFrom, pathTo);
        await fs.access(pathCd);
        return pathCd;
    } catch (err) {
        console.error('Operation failed');
        return pathFrom;
    }
}

export { goUpDirectory, changeDirectory }