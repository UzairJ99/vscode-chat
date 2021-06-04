import app from './auth'
// socket.io setup and binding to http server
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
    // cors needs to be setup again for the socket.io server
    const io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"]
        }
    });

    let numUsers = 0;


    // Routes for socket.io specifically
    io.on("connection", (socket: any) => {
        ++numUsers;
        let message = {
            text: 'A new user has joined the chat',
            name: 'Server',
            received: true
        };
        console.log(`some user connected.`);

        socket.emit('user joined', { message, numUsers });
	      socket.broadcast.emit('user joined', { message, numUsers });

        /**
         * broad cast the message to the socket.io server
         * @param {string} message - the message being sent from the user
         * @return {void}
         */
        socket.on('message', (message:string) => {
            socket.broadcast.emit('message', message);
        });
    
        /**
         * disconnect the user from the socket.io server
         * @return {void}
         */
        socket.on('disconnect', () => {
            --numUsers;
            socket.broadcast.emit('user left', numUsers);
        });
    
        /**
         * broad cast the user leaving from the server, to the socket.io server
         * @param {string} name - username of person leaving
         * @return {void}
         */
        socket.on('user disconnect', (name:string) => {
            socket.broadcast.emit('message', `Server: ${name} has left the chat.`)
        });
    });

export default server