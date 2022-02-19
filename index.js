import cluster from "cluster";
import os from "os";
import http from "http";
import * as fs from "fs";
import * as path from "path";
import {fileURLToPath} from 'url';
import {htmlEnd, htmlStart} from "./Misc/htmlParts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    const server = http.createServer((req, res) => {
        const url = req.url;
        let data = htmlStart;
        if (url === '/favicon.ico') return;
        const currentPath = path.join(__dirname, url);
        if (fs.lstatSync(currentPath).isFile()) {
            fs.readFile(currentPath, 'utf8', (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    data += result;
                    data += htmlEnd;

                    res.writeHead(200, 'OK', {
                        'Content-Type': 'text/html',
                    });
                    res.end(data);
                }
            });
        } else {
            const list = fs.readdirSync(path.join(__dirname, url));
            data += '<ul class="browser">';
            list.forEach(item => {
                data += `<li><a href="http://localhost:3300${url}/${item}">${item}</a></li>`
            });
            data += '</ul>';
            data += htmlEnd;

            res.writeHead(200, 'OK', {
                'Content-Type': 'text/html',
            });
            res.end(data);
        }

    });

    server.listen(3300);
}