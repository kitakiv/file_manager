import { exitCommand } from './src/main/exit.js';
import { read } from './src/fs/read.js';
import os from 'node:os';
import readline from 'node:readline';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const userHomeDir = os.homedir();
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});

rl.prompt();

rl.on('line', async(line) => {
  const command = line.trim().split(' ')[0];
  switch (command) {
    case 'cat':
      console.log('world!');
      await read(line.trim().split(' ')[1], __dirname);
      break;
    case '.exit':
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

