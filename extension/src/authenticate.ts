import * as polka from "polka";
// import { Server } from "http";
// import fetch from "node-fetch";
// import { URL, URLSearchParams } from "url";
import * as vscode from "vscode";
// import * as passport from "passport";
// import { APIBASEURL } from "./constants";


// https://github.com/shanalikhan/code-settings-sync/blob/master/src/service/github.oauth.service.ts
export const authenticate = (
    // fn: (x: {accessToken: string; refreshToken: string}) => void
) => {
    // let session = require("express-session");
    const app = polka();
    const LOGINPORT = 3002;

    app.get(`/auth/:token`, async (req: any, res: any) => {
        const { token } = req.params;
        if (!token) {
            res.end(`<h1>Something went wrong</h1>`);
            return;
        }

        console.log(token);

        res.end(`<h1>auth was successful.</h1>`);
    });

    app.listen(LOGINPORT, (err:Error) => {
        if (err) {
            vscode.window.showErrorMessage(err.message);
        } else {
            // vs code will spin up it's own server on port 3002
            vscode.commands.executeCommand(
                "vscode.open",
                vscode.Uri.parse('http://localhost:8080/auth/github')
            );
        }
    });
};