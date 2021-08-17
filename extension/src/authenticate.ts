import * as polka from "polka";
// import { Server } from "http";
// import fetch from "node-fetch";
// import { URL, URLSearchParams } from "url";
import * as vscode from "vscode";
// import * as passport from "passport";
// import { APIBASEURL } from "./constants";
import { TokenMgr} from './TokenMgr';

// https://github.com/shanalikhan/code-settings-sync/blob/master/src/service/github.oauth.service.ts
export const authenticate = (
    // TODO: setup refresh token when this function is called
    // fn: (x: {accessToken: string; refreshToken: string}) => void
) => {
    // let session = require("express-session");
    const app = polka();
    const LOGINPORT = 3002;

    // open login portal for the user in a new window.
    app.get('/login',async(_req: any, _res:any) => {
        vscode.commands.executeCommand(
            "vscode.open",
            vscode.Uri.parse('http://localhost:8080/auth/github')
        );
    });

    // receive authentication token from backend after the user gets redirected.
    app.get(`/auth/:token`, async (req: any, res: any) => {
        const { token } = req.params;
        if (!token) {
            res.end(`<h1>Something went wrong</h1>`);
            return;
        }
        await TokenMgr.setToken(token);

        res.end(`<h1>auth was successful.</h1>`);
        (app as any).server.close();
    });

    // spin up the server.
    app.listen(LOGINPORT, (err:Error) => {
        if (err) {
            console.log(err);
        }
        console.log("Authentication server started");
    });
};