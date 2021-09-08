import * as polka from "polka";
// import { Server } from "http";
// import fetch from "node-fetch";
// import { URL, URLSearchParams } from "url";
import * as vscode from "vscode";
// import * as passport from "passport";
// import { APIBASEURL } from "./constants";
import { TokenMgr} from './TokenMgr';
const redirect = require('@polka/redirect');
// https://github.com/shanalikhan/code-settings-sync/blob/master/src/service/github.oauth.service.ts
export const authenticate = (
    // fn: (x: {accessToken: string; refreshToken: string}) => void
) => {
    // let session = require("express-session");
    const app = polka();
    const LOGINPORT = 3002;

    app.get('/login',async(req: any, res:any)=>{
        //res.send("hello, workj man, kill me, I hate Neesh")
        vscode.commands.executeCommand(
            "vscode.open",
            vscode.Uri.parse('http://localhost:8080/auth/github')
        );
    })
    app.get(`/auth/:token`, async (req: any, res: any) => {
        const { token } = req.params;
        if (!token) {
            res.end(`<h1>Something went wrong</h1>`);
            return;
        }
        await TokenMgr.setToken(token);
        // console.log(token);
        redirect(res, 'http://localhost:8080/user',{
            headers:{
                authorization: `${token}`
            }
        });
        res.end(`<h1>auth was successful.</h1>`);
        (app as any).server.close();
    });

    app.listen(LOGINPORT, (err:Error) => {
        console.log("Authenticate started")
    });
};