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
const routes_1 = __importDefault(require("./routes"));
const passport_1 = __importDefault(require("passport"));
require('dotenv-safe').config();
var User = require("./models/User");
var GitHubStrategy = require('passport-github').Strategy;
const gitHubParams = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
};
passport_1.default.use(new GitHubStrategy(gitHubParams, (_, __, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
    cb(null, { accessToken: "", refreshToken: "" });
    let gitHubProfileJSON = profile._json;
    let user = yield User.findOne({ githubId: gitHubProfileJSON.id });
    let userData = {
        githubId: gitHubProfileJSON.id,
        name: gitHubProfileJSON.name,
        avatarUrl: gitHubProfileJSON.avatar_url,
        profileUrl: gitHubProfileJSON.url
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
routes_1.default.use(passport_1.default.initialize());
passport_1.default.serializeUser(function (user, done) {
    done(null, user.accessToken);
});
routes_1.default.get('/auth/github', passport_1.default.authenticate('github', { session: false }));
routes_1.default.get('/auth/github/callback', passport_1.default.authenticate('github', { session: false }), (_req, res) => {
    console.log("successfully logged in through GitHub!");
    res.send("you logged in correctly");
});
exports.default = routes_1.default;
//# sourceMappingURL=auth.js.map