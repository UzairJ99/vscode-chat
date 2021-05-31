import express from 'express';
import "reflect-metadata";
import passport from "passport";
var User = require("./models/User")
require('dotenv-safe').config();

var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github').Strategy;

const main = async () => {
    const app = express();
    /*
        NOTE: in the terminal run the command npm run watch to recompile
        in the backend directory if the port is not configured correctly 
        or if it's using a previously set up port.
        When refactoring later we will change the app's path to a constant
        variable so ports don't get mixed up.
        If PORT is changed here, also change it in ChatList.svelte's 
        sendMsg() function.
    */
    const PORT = process.env.PORT || 8080;
    // connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, () => {
      console.log('Connected to database.');
    });

    /*
      configuration for cross origin resource sharing since the VS Code API
      is running seperately from our backend server.
      Body parser used for data extraction from HTTP requests.
    */
    app.use(cors({origin: "*"}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.use(passport.initialize());
    // authenticate user
    passport.serializeUser(function(user: any, done) {
        done(null, user.accessToken); 
    });

    // github Oauth parameters
    const gitHubParams = {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/github/callback"
    }

    // login user to github through passport
    passport.use(new GitHubStrategy(gitHubParams, async (_: any, __: any, profile: any, cb: any) => {
        // call back function params
        cb(null, { accessToken: "", refreshToken: ""})
        // extract github profile from json data and create a user object for the mongoose model
        let gitHubProfileJSON = profile._json;
        let user = await User.findOne({githubId: gitHubProfileJSON.id})
        let userData = {
            githubId: gitHubProfileJSON.id, 
            name: gitHubProfileJSON.name, 
            avatarUrl: gitHubProfileJSON.avatar_url,
            profileUrl: gitHubProfileJSON.url
        }

        try {
            // if the user wasn't found then create one
            if (!user) {
                user = await User.create(userData);
            }
        } catch(err) {
            return cb(err, user)
        } finally {            
            return cb(null, user)
        }

    }));

    app.get('/auth/github', passport.authenticate('github', {session: false}));
    app.get('/auth/github/callback', 
    passport.authenticate('github', {session:false}), (_req, res) => {
        console.log("successfully logged in through GitHub!");
        res.send("you logged in correctly")
        // Successful authentication, redirect home.
        //res.redirect('/');
    });

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

    // landing page - go to localhost:8080 to test if this shows up
    app.get('/', (_req, res)=> {
        res.send("HI");  
    });

    // send message from the textbox to the database
    app.post('/sendMessage', (req, res) => {
        // extract text message from the body of the request sent
        let message = req.body;
        console.log(message);
        // replace with socket.io functionality and database functions
        res.send(message);
    });

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

    // activate app on port
    server.listen(PORT, ()=> {
        console.log(`Back end server started on port ${PORT}`);
    });
};

main();