#!/usr/bin/env node
import * as fs from "fs";
import yargs from 'yargs';
import * as path from "path";
import {fileURLToPath} from 'url';

const ya = yargs(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = ya
    .usage('Usage: -p <path to file>')
    .options('p', {
        alias: 'path',
        describe: 'Path to file',
        type: 'string',
        demandOption: true
    })
    .argv;

const filePath = path.resolve(__dirname, options.path);
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) console.log(err);
    else console.log(data);
});

console.log(filePath);

console.log('cli');