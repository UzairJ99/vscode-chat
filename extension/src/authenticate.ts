import * as express from "express";
import { Server } from "http";
import fetch from "node-fetch";
import { URL, URLSearchParams } from "url";
import * as vscode from "vscode";
import * as passport from "passport";


// https://github.com/shanalikhan/code-settings-sync/blob/master/src/service/github.oauth.service.ts
export const authenticate = (
    // fn: (x: {accessToken: string; refreshToken: string}) => void
) => {
    let session = require("express-session");
    const app = express();
    const LOGINPORT = 5000;
    app.listen(LOGINPORT);

    // vs code will spin up it's own server on port 3002
    vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.parse('http://localhost:3002/auth/github')
    );

    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/github', passport.authenticate('github', {session: false}));
    app.get('/auth/github/callback', 
        passport.authenticate('github', {session:false}), (req, res) => {
        console.log("successfully logged in through GitHub!");
        res.send("you logged in correctly");
        console.log(req.user);
        // Successful authentication, redirect home.
        //res.redirect('/');
    

        // fn({accessToken, refreshToken});

        res.end(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta
            http-equiv="Content-Security-Policy"
            content="default-src vscode-resource:; form-action vscode-resource:; frame-ancestors vscode-resource:; img-src vscode-resource: https:; script-src 'self' 'unsafe-inline' vscode-resource:; style-src 'self' 'unsafe-inline' vscode-resource:;"
            />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        </head>
        <body>
            <h1>Success! You may now close this tab.</h1>
            <style>
                html, body {
                background-color: #1a1a1a;
                color: #c3c3c3;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                margin: 0;
                }
            </style>
        </body>
        </html>
        `);

        (app as any).server.close();
    });
}