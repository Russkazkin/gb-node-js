import cluster from "cluster";
import os from "os";
import http from "http";
import path from "path";
import fs from "fs";
import htmlStart from "./Misc/start.js";
import htmlEnd from "./Misc/end.js";

if (cluster.isMaster) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    const server = http.createServer((req, res) => {
        let data = htmlStart;
        data += '<li>Test</li>'
        data += htmlEnd;

        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
        });
        res.end(data);
    });

    server.listen(3300);
}