export function exitCommand(userName) {
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n\n`);
    process.exit(0);
}