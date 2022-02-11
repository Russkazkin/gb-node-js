import readline from 'readline';
import fs from 'fs';

import dotenv from "dotenv";

dotenv.config();

const readInterface = readline.createInterface({
    input: fs.createReadStream(process.env.ACCESS_LOG),
    output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {
    console.log(`${line}\n`);
});

