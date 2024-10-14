import os from 'node:os';

const osEOL = () => {
    return os.EOL;
}

const osCpus = () => {
    const cpus = os.cpus();
    const len = os.availableParallelism();
    cpus.map((cpu, index) => {
        delete cpu.times;
        cpu['index'] = index;
        cpu.speed = (cpu.speed / 1000).toFixed(2) + ' GHz';
        return cpu
    });

    return {
        length: len,
        cpus: cpus
    }
}

const osHomedir = () => {
    return os.homedir();
}

const osUsername = () => {
   return os.userInfo().username
}

const osArchitecture = () => {
    return os.arch();
}

export { osEOL, osCpus, osHomedir, osUsername, osArchitecture };