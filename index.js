const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer(((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(res);
}));

const io = socket(server);

io.on('connection', client => {
    const connectionData = { id: client.id };
    client.broadcast.emit('serverConnected', connectionData);
    client.emit('serverConnected', connectionData);
    console.log(client.id);
    client.on('clientMessage', data => {
        const messageData = { id: client.id, message: data.message };
        client.broadcast.emit('serverMessage', messageData);
        client.emit('serverMessage', messageData);
        console.log(data);
    });
    client.on('disconnect', () => {
        client.broadcast.emit('serverDisconnected', connectionData);
    });
});

server.listen(3300);