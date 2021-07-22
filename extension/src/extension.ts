// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ChatPanel } from './ChatPanel';
import { authenticate } from './authenticate';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vs-chat" is now active!');

	/*
	The command has been defined in the package.json file
	Now provide the implementation of the command with registerCommand
	The commandId parameter must match the command field in package.json
	Wrap each new command that we want registered inside the context subscriptions push function
	*/
	context.subscriptions.push(
		vscode.commands.registerCommand('vs-chat.helloWorld', () => {
			vscode.window.showInformationMessage("Hello from VS-Chat!");
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('vs-chat.askQuestion', async () => {
			const answer = await vscode.window.showInformationMessage('How was your day?', 'good', 'bad');

			if (answer === 'bad') {
				vscode.window.showInformationMessage("sorry to hear that :(");
			} else {
				vscode.window.showInformationMessage("that's great!");
			}
		})
	);

	// this is the main command to run this extension
	context.subscriptions.push(
		vscode.commands.registerCommand('vs-chat.chatroom', () => {
			ChatPanel.createOrShow(context.extensionUri);
		})
	);

	// this command lets us refresh webviews whenever we make changes
	// speeds up our development progress
	context.subscriptions.push(
		vscode.commands.registerCommand('vs-chat.refresh', () => {
			ChatPanel.kill();
			ChatPanel.createOrShow(context.extensionUri);
			// the chat panel doesn't show instantly so we'll give the next command a small delay
			setTimeout(()=> {
				vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
			}, 500);
		})
	);

	// testing authentication
	context.subscriptions.push(
		vscode.commands.registerCommand('vs-chat.authenticate', () => {
			authenticate();
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}