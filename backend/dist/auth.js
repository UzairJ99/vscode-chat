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
exports.app = void 0;
const routes_1 = __importDefault(require("./routes"));
exports.app = routes_1.default;
const passport_1 = __importDefault(require("passport"));
let session = require("express-session");
require('dotenv-safe').config();
var User = require("./models/User");
var GitHubStrategy = require('passport-github2').Strategy;
passport_1.default.serializeUser(function (user, done) {
    done(null, user.accessToken);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user.accessToken);
});
const gitHubParams = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
};
passport_1.default.use(new GitHubStrategy(gitHubParams, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    let gitHubProfileJSON = profile._json;
    let user = yield User.findOne({ githubId: gitHubProfileJSON.id });
    let userData = {
        githubId: gitHubProfileJSON.id,
        name: gitHubProfileJSON.name,
        avatarUrl: gitHubProfileJSON.avatar_url,
        profileUrl: gitHubProfileJSON.url,
        accessToken: accessToken
    };
    try {
        if (!user) {
            user = yield User.create(userData);
        }
    }
    catch (err) {
        return cb(err, user);
    }
    finally {
        return cb(null, user);
    }
})));
routes_1.default.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
routes_1.default.use(passport_1.default.initialize());
routes_1.default.use(passport_1.default.session());
routes_1.default.get('/auth/github', passport_1.default.authenticate('github', { session: false }));
routes_1.default.get('/auth/github/callback', passport_1.default.authenticate('github', { session: false }), (req, res) => {
    console.log(req.user);
    res.redirect(`http://localhost:3002/auth/${req.user.accessToken}`);
});
//# sourceMappingURL=auth.js.map