import { open, close, write } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fresh.txt');

const create = async () => {
    open(filePath, 'wx', async (err, fd) => {
        if (err) {
          if (err.code === 'EEXIST') {
            throw new Error('FS operation failed');
          }
          throw err;
        }
        try {
          await write(fd, 'I am fresh and young', (err) => {
            if (err) throw err;
          });
        } finally {
          close(fd, (err) => {
            if (err) throw err;
          });
        }
      });
};

await create();