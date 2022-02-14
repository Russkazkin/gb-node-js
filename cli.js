#!/usr/bin/env node
import yargs from 'yargs';

const ya = yargs(process.argv.slice(2));

const options = ya
    .usage('Usage: -p <path to file>')
    .options('p', {
        alias: 'path',
        describe: 'Path to file',
        type: 'string',
        demandOption: true
    })
    .argv;

console.log(options);

console.log('cli');