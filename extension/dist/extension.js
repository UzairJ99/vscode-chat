/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const ChatPanel_1 = __webpack_require__(2);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vs-chat" is now active!');
    /*
    The command has been defined in the package.json file
    Now provide the implementation of the command with registerCommand
    The commandId parameter must match the command field in package.json
    Wrap each new command that we want registered inside the context subscriptions push function
    */
    context.subscriptions.push(vscode.commands.registerCommand('vs-chat.helloWorld', () => {
        vscode.window.showInformationMessage("Hello from VS-Chat!");
    }));
    context.subscriptions.push(vscode.commands.registerCommand('vs-chat.askQuestion', () => __awaiter(this, void 0, void 0, function* () {
        const answer = yield vscode.window.showInformationMessage('How was your day?', 'good', 'bad');
        if (answer === 'bad') {
            vscode.window.showInformationMessage("sorry to hear that :(");
        }
        else {
            vscode.window.showInformationMessage("that's great!");
        }
    })));
    // this is the main command to run this extension
    context.subscriptions.push(vscode.commands.registerCommand('vs-chat.chatroom', () => {
        ChatPanel_1.ChatPanel.createOrShow(context.extensionUri);
    }));
    // this command lets us refresh webviews whenever we make changes
    // speeds up our development progress
    context.subscriptions.push(vscode.commands.registerCommand('vs-chat.refresh', () => {
        ChatPanel_1.ChatPanel.kill();
        ChatPanel_1.ChatPanel.createOrShow(context.extensionUri);
        // the chat panel doesn't show instantly so we'll give the next command a small delay
        setTimeout(() => {
            vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
        }, 500);
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");;

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatPanel = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
class ChatPanel {
    constructor(panel, extensionUri) {
        this._disposables = [];
        this._panel = panel;
        this._extensionUri = extensionUri;
        // Set the webview's initial html content
        this._update();
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // // Handle messages from the webview
        // this._panel.webview.onDidReceiveMessage(
        //   (message) => {
        //     switch (message.command) {
        //       case "alert":
        //         vscode.window.showErrorMessage(message.text);
        //         return;
        //     }
        //   },
        //   null,
        //   this._disposables
        // );
    }
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor
            ? vscode.ViewColumn.Three
            : undefined;
        // If we already have a panel, show it.
        if (ChatPanel.currentPanel) {
            ChatPanel.currentPanel._panel.reveal(column);
            ChatPanel.currentPanel._update();
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(ChatPanel.viewType, "Chat Room", column || vscode.ViewColumn.Three, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "media"),
                vscode.Uri.joinPath(extensionUri, "out/compiled"),
            ],
        });
        ChatPanel.currentPanel = new ChatPanel(panel, extensionUri);
    }
    static kill() {
        var _a;
        (_a = ChatPanel.currentPanel) === null || _a === void 0 ? void 0 : _a.dispose();
        ChatPanel.currentPanel = undefined;
    }
    static revive(panel, extensionUri) {
        ChatPanel.currentPanel = new ChatPanel(panel, extensionUri);
    }
    dispose() {
        ChatPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    _update() {
        return __awaiter(this, void 0, void 0, function* () {
            const webview = this._panel.webview;
            this._panel.webview.html = this._getHtmlForWebview(webview);
            webview.onDidReceiveMessage((data) => __awaiter(this, void 0, void 0, function* () {
                switch (data.type) {
                    case "onInfo": {
                        if (!data.value) {
                            return;
                        }
                        vscode.window.showInformationMessage(data.value);
                        break;
                    }
                    case "onError": {
                        if (!data.value) {
                            return;
                        }
                        vscode.window.showErrorMessage(data.value);
                        break;
                    }
                    // case "tokens": {
                    //   await Util.globalState.update(accessTokenKey, data.accessToken);
                    //   await Util.globalState.update(refreshTokenKey, data.refreshToken);
                    //   break;
                    // }
                }
            }));
        });
    }
    _getHtmlForWebview(webview) {
        /*
        URI to load CSS files into the webview. Follow this format when making file URIs:
        @param base: string - the base path to the file
        @param media: string - the subfolder after the base path
        @param reset.css: string - the css file
        */
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "reset.css"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css"));
        const demoUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "demo.css"));
        const loginPageCSS = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "loginPage.css"));
        const messagesPageCSS = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "messagesPage.css"));
        const navbarCSS = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "navbar.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out/compiled", "Chats.js"));
        // Use a nonce to only allow specific scripts to be run
        const nonce = getNonce_1.default();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
			  <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${demoUri}" rel="stylesheet">
          <link href="${navbarCSS}" rel="stylesheet">
          <link href="${messagesPageCSS}" rel="stylesheet">
          <link href="${loginPageCSS}" rel="stylesheet">
          <link href="${styleMainUri}" rel="stylesheet">
          <script nonce="${nonce}"></script>
		  </head>
        <body>
		    </body>
        <script src='${scriptUri}' nonce='${nonce}'>
		  </html>`;
    }
}
exports.ChatPanel = ChatPanel;
ChatPanel.viewType = "vs-chat";


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const getNonce = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.default = getNonce;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map