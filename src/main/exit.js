export function exitCommand(userName) {
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n\n`);
    process.exit(0);
}

export function deleteQuotes(line) {
   if ((line.startsWith('"') && line.endsWith('"')) || (line.startsWith('\'') && line.endsWith('\''))) {
       return line.slice(1, line.length - 1);
   } else {
       return line;
   }
}