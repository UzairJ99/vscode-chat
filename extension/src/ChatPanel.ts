import * as vscode from "vscode";
import getNonce from './getNonce';

export class ChatPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: ChatPanel | undefined;

  public static readonly viewType = "vs-chat";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
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
    const panel = vscode.window.createWebviewPanel(
      ChatPanel.viewType,
      "Chat Room",
      column || vscode.ViewColumn.Three,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],
      }
    );

    ChatPanel.currentPanel = new ChatPanel(panel, extensionUri);
  }

  // close chat panel
  public static kill() {
    ChatPanel.currentPanel?.dispose();
    ChatPanel.currentPanel = undefined;
  }

  // re-open chat panel
  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    ChatPanel.currentPanel = new ChatPanel(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;

    // Set the webview's initial html content
    this._update();

    // Listen for when the panel is closed
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
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

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);
    webview.onDidReceiveMessage(async (data) => {
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
        // TODO: store token in app state upon user login
        // case "tokens": {
        //   await Util.globalState.update(accessTokenKey, data.accessToken);
        //   await Util.globalState.update(refreshTokenKey, data.refreshToken);
        //   break;
        // }
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    /**
    * URI to load CSS files into the webview. Follow this format when making file URIs:
    * @param base: string - the base path to the file
    * @param media: string - the subfolder after the base path
    * @param reset.css: string - the css file
    */
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    const demoUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "demo.css")
    );

    const loginPageCSS = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "loginPage.css")
    );

    const messagesPageCSS = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "messagesPage.css")
    );

    const navbarCSS = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "navbar.css")
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out/compiled", "Chats.js")
    );
   

    // Use a nonce to only allow specific scripts to be run - whitelisting
    const nonce = getNonce();

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
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet"> 
       <script nonce="${nonce}"></script>
		  </head>
        <body>
		    </body>
        <script src='${scriptUri}' nonce='${nonce}'>
		  </html>`;
    }
}