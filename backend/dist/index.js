"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const passport_1 = __importDefault(require("passport"));
require('dotenv').config();
var cors = require('cors');
var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github').Strategy;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(passport_1.default.initialize());
    passport_1.default.serializeUser(function (user, done) {
        done(null, user.accessToken);
    });
    passport_1.default.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/github/callback"
    }, (_, __, profile, cb) => {
        console.log(profile);
        cb(null, { accessToken: "", refreshToken: "" });
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }));
    app.get('/auth/github', passport_1.default.authenticate('github'));
    app.get('/auth/github/callback', passport_1.default.authenticate('github'), (req, res) => {
        res.send("you logged in correctly");
        res.redirect('/');
    });
    app.use(cors({ origin: "*" }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    const http = require('http');
    const server = http.createServer(app);
    const { Server } = require('socket.io');
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    let numUsers = 0;
    const PORT = process.env.PORT || 8080;
    app.get('/', (_req, res) => {
        res.send('hello world!');
    });
    app.post('/sendMessage', (req, res) => {
        let message = req.body;
        console.log(message);
        res.send(message);
    });
    io.on("connection", (socket) => {
        ++numUsers;
        let message = 'Server: A new user has joined the chat';
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
    server.listen(PORT, () => {
        console.log(`Back end server started on port ${PORT}`);
    });
});
main();
//# sourceMappingURL=index.js.map