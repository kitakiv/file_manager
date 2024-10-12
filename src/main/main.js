import { exitCommand } from './exit.js';
import read from '../fs/read.js';
import os from 'node:os';
import readline from 'node:readline';
import { fileURLToPath } from 'url';
import create from '../fs/create.js';
import rename from '../fs/rename.js';
import copy from '../fs/copy.js';
import move from '../fs/move.js';
import remove  from '../fs/delete.js';
import{ dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let userHomeDir = os.homedir();
const args = process.argv.slice(2);
let userName = undefined;
const userArg = args.filter(arg => {
  return arg.startsWith('--username=')
});
if (userArg.length > 0) {
  const name = userArg[0].split('=')[1];
  if (!name) {
    process.stdout.write(`No passed argument to variable userName\n`);
  } else {
    userName = name;
  }
} else {
  process.stdout.write(`The variable userName is undefined\n`);
}

process.stdout.write(`Welcome to the File Manager, ${userName}!\n\n`);

const main = async () => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const command = line.trim().split(' ')[0];
    switch (command) {
      case 'cat':
        await read(line.trim().split(' ')[1]);
        break;
      case 'add':
        await create(line.trim().split(' ')[1]);
        break;
      case 'rn':
        await rename(line.trim().split(' ')[1], line.trim().split(' ')[2]);
        break;
      case 'cp':
        await copy(line.trim().split(' ')[1], line.trim().split(' ')[2]);
        break;
      case 'mv':
        await move(line.trim().split(' ')[1], line.trim().split(' ')[2]);
        break;
      case 'rm':
        await remove(line.trim().split(' ')[1]);
        break;
      case line.trim() === '.exit':
        exitCommand(userName);
        break;
      default:
        console.error('Invalid input');
        break;
    }
    console.log(`\nYou are currently in ${userHomeDir}\n`);
    rl.prompt();
  })

  rl.on('SIGINT', () => {
    exitCommand(userName);
  });


};

await main();

