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
    .usage('Usage: -p <path to file> -s <String to search>')
    .options({
        'p': {
            alias: 'path',
            describe: 'Path to file',
            type: 'string',
            demandOption: true
        },
        's': {
            alias: 'search',
            describe: 'String to search',
            type: 'string',
            demandOption: true
        },
    })
    .argv;

const filePath = path.resolve(__dirname, options.path);

const fileBrowse = currentPath => {
    if (fs.lstatSync(currentPath).isFile()) {
        fs.readFile(currentPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const regexp = new RegExp(options.search, 'g');
                const result = data.match(regexp);
                if (!result) {
                    console.log('Совпадений не найдено.')
                } else {
                    console.log(`Найдено совпадений: ${result.length}`);
                }
            }
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
            fileBrowse(nextPath);
        });
    }
}

fileBrowse(filePath);




console.log(filePath);

console.log('cli');