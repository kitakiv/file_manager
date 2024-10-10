import { exitCommand } from './exit.js';
import os from 'node:os';
import readline from 'node:readline';

const userHomeDir = os.homedir();
const args = process.argv.slice(2);
const userName = args.filter(arg => {
    return arg.startsWith('--username=')
})[0].split('=')[1];

process.stdout.write(`Welcome to the File Manager, ${userName}!\n\n`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ',
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    case '.exit':
      exitCommand(userName);
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);
      break;
  }
  console.log(`You are currently in ${userHomeDir}`);
  rl.prompt();
})

rl.on('SIGINT', () => {
    exitCommand(userName);
});

