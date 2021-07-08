"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const http = require('http');
const server = http.createServer(auth_1.app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
let numUsers = 0;
io.on("connection", (socket) => {
    ++numUsers;
    let message = {
        text: 'A new user has joined the chat',
        name: 'Server',
        received: true
    };
    console.log(`some user connected.`);
    socket.emit('user joined', { message, numUsers });
    socket.broadcast.emit('user joined', { message, numUsers });
    socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => {
        --numUsers;
        socket.broadcast.emit('user left', numUsers);
    });
    socket.on('user disconnect', (name) => {
        socket.broadcast.emit('message', `Server: ${name} has left the chat.`);
    });
});
exports.default = server;
//# sourceMappingURL=socket.js.map