import { exitCommand, deleteQuotes } from './exit.js';
import read from '../fs/read.js';
import readline from 'node:readline';
import create from '../fs/create.js';
import rename from '../fs/rename.js';
import copy from '../fs/copy.js';
import move from '../fs/move.js';
import remove from '../fs/delete.js';
import calculateHash from '../hash/hash.js';
import compress from '../zip/compress.js';
import decompress from '../zip/decompress.js';
import listOfFiles from '../ls/ls.js';
import { goUpDirectory, changeDirectory } from '../nwd/nwd.js';
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
    const length = line.trim().split(' ').length;
    switch (length) {
      case 1:
        await switchOne(line.trim().split(' ')[0]);
        break;
      case 2:
        await switchTwo(line.trim().split(' ')[0], line);
        break;
      case 3:
        await switchThree(line.trim().split(' ')[0], line);
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

const switchOne = async (command) => {
  switch (command) {
    case '.exit':
      await exitCommand(userName);
      break;
    case 'ls':
      await listOfFiles('./');
      break;
    case 'up':
      userHomeDir = await goUpDirectory(userHomeDir);
      break;
    default:
      console.error('Invalid input');
      break;
  }
};

const switchTwo = async (command, line) => {
  const pathToFile = deleteQuotes(line.split(' ')[1]);
  switch (command) {
    case 'os':
      await switchOs(line);
      break;
    case 'cat':
      await read(pathToFile);
      break;
    case 'add':
      await create(pathToFile);
      break;
    case 'rm':
      await remove(pathToFile);
      break;
    case 'hash':
      await calculateHash(pathToFile);
      break;
    case 'cd':
      userHomeDir = await changeDirectory(userHomeDir, pathToFile);
      break;
    default:
      console.error('Invalid input');
      break;
  }
};

const switchThree = async (command, line) => {
  const pathToFile = deleteQuotes(line.split(' ')[1]);
  const pathFromFile = deleteQuotes(line.split(' ')[2]);
  switch (command) {
    case 'cp':
      await copy(pathToFile, pathFromFile);
      break;
    case 'mv':
      await move(pathToFile, pathFromFile);
      break;
    case 'compress':
      await compress(pathToFile, pathFromFile);
      break;
    case 'decompress':
      await decompress(pathToFile, pathFromFile);
      break;
    case 'rn':
      await rename(pathToFile, pathFromFile);
      break;
    default:
      console.error('Invalid input');
      break;
  }
}

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

await main();

