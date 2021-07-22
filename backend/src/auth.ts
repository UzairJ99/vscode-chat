import app from './routes'
import passport from "passport";
let session = require("express-session")
require('dotenv-safe').config();
var User = require("./models/User")
var GitHubStrategy = require('passport-github2').Strategy;

//For a user to be continuously logged in even after refresh, passports needs to be able to 
//serialise user into a session, hence saves only the accessToken
passport.serializeUser(function(user: any, done) {
    done(null, user.accessToken); 
});
//deserialise user out of a session, hence finding user by the accessToken.
passport.deserializeUser(function(user: any, done) {
    done(null, user.accessToken); 
});

// github Oauth parameters
const gitHubParams = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  }
// login user to github through passport
passport.use(new GitHubStrategy(gitHubParams, async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
    // call back function params
    //cb(null, { accessToken: "", refreshToken: ""})
    // extract github profile from json data and create a user object for the mongoose model
    let gitHubProfileJSON = profile._json;
    let user = await User.findOne({githubId: gitHubProfileJSON.id})
    let userData = {
        githubId: gitHubProfileJSON.id, 
        name: gitHubProfileJSON.name, 
        avatarUrl: gitHubProfileJSON.avatar_url,
        profileUrl: gitHubProfileJSON.url,
        accessToken: accessToken
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

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github', {session: false}));
app.get('/auth/github/callback', 
    passport.authenticate('github', {session:false}), (req, res) => {
        console.log(req.user)
        // Successful authentication, send the access token to vs code's server
        res.redirect(`http://localhost:3002/auth/${req.user.accessToken}`);
});
export {app}