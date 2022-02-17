#!/usr/bin/env node
import * as fs from "fs";
import yargs from 'yargs';
import inquirer from 'inquirer';
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
let currentPath = filePath;

const fileBrowse = currentPath => {
    console.log(currentPath);
    if (fs.lstatSync(currentPath).isFile()) {
        fs.readFile(currentPath, 'utf8', (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        });
    } else {
        const list = fs.readdirSync(currentPath);
        inquirer.prompt([
            {
                name: 'fileName',
                type: 'list',
                message: 'Выберите файл для поиска',
                choices: list,
            }
        ]).then(answer => {
            const nextPath = `${currentPath}/${answer.fileName}`;
            console.log(nextPath, 'nextPath');
            fileBrowse(nextPath);
        });
    }
}

fileBrowse(currentPath);




console.log(filePath);

console.log('cli');