import app from './routes'
import passport from "passport";
require('dotenv-safe').config();

var User = require("./models/User")
var GitHubStrategy = require('passport-github').Strategy;

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

app.use(passport.initialize());
// authenticate user
passport.serializeUser(function(user: any, done) {
    done(null, user.accessToken); 
});

app.get('/auth/github', passport.authenticate('github', {session: false}));
app.get('/auth/github/callback', 
    passport.authenticate('github', {session:false}), (_req, res) => {
        console.log("successfully logged in through GitHub!");
        res.send("you logged in correctly")
        // Successful authentication, redirect home.
        //res.redirect('/');
});
export default app