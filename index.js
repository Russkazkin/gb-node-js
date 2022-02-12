import readline from 'readline';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

const readInterface = readline.createInterface({
    input: fs.createReadStream(process.env.ACCESS_LOG),
    output: process.stdout,
    console: false
});

const ips = ['89.123.1.41', '34.48.240.111'];
const writeStreams = {};
ips.forEach(ip => {
    writeStreams[ip] = fs.createWriteStream(`./${ip}_requests.log`, {
        encoding: 'utf8',
        flags: 'a',
    });
});

readInterface.on('line', function(line) {
    ips.forEach(ip => {
        const testString = `^${ip}`;
        const regexp = new RegExp(testString);
        if (regexp.test(line)) {
            writeStreams[ip].write(`${line}\n`);
        }
    });
});

