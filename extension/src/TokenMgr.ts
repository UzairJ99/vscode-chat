import * as vscode from "vscode";

export class TokenMgr{
    static globalState: vscode.Memento;
    static setToken(token:string){
        return this.globalState.update("vsChatToken", token);
    }

    static getToken(): string | undefined{
        return this.globalState.get("vsChatToken");
    }
}