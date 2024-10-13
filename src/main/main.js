import { exitCommand } from './exit.js';
import read from '../fs/read.js';
import readline from 'node:readline';
import create from '../fs/create.js';
import rename from '../fs/rename.js';
import copy from '../fs/copy.js';
import move from '../fs/move.js';
import remove  from '../fs/delete.js';
import calculateHash from '../hash/hash.js';
import compress from '../zip/compress.js';
import decompress from '../zip/decompress.js';
import listOfFiles from '../ls/ls.js';
import { osEOL, osCpus, osHomedir, osUsername, osArchitecture } from '../os/os.js';

let userHomeDir = osHomedir();
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
    if (command === 'os') {
      await switchOs(line.trim());
    } else {
      await switchCommand(command, line.trim());
    }
    console.log(`\nYou are currently in ${userHomeDir}\n`);
    rl.prompt();
  })

  rl.on('SIGINT', () => {
    exitCommand(userName);
  });


};

const switchOs = async (line) => {
  switch (line) {
    case 'os --EOL':
      console.log(`${osEOL()}`);
      break;
    case 'os --cpus':
      console.log(osCpus());
      break;
    case 'os --username':
      process.stdout.write(osUsername());
      break;
    case 'os --homedir':
      process.stdout.write(osHomedir());
      break;
    case 'os --architecture':
      process.stdout.write(osArchitecture());
      break;
    default:
        console.error('Invalid input');
      break;
  }
};

const switchCommand = async (command, line) => {
  switch (command) {
    case 'ls':
      await listOfFiles('./');
      break;
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
    case 'hash':
      await calculateHash(line.trim().split(' ')[1]);
      break;
    case 'compress':
      await compress(line.trim().split(' ')[1], line.trim().split(' ')[2]);
      break;
    case 'decompress':
      await decompress(line.trim().split(' ')[1], line.trim().split(' ')[2]);
      break;
    case '.exit':
      exitCommand(userName);
      break;
    default:
      console.error('Invalid input');
      break;
  }
};

await main();

