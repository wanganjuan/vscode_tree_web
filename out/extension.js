"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const treeview_1 = require("./tview/treeview");
function activate(context) {
    // Only allow a single Cat Coder
    let panel = undefined;
    treeview_1.TreeViewProvider.initTreeViewItem();
    context.subscriptions.push(vscode.commands.registerCommand('turing.code', () => {
        panel = vscode.window.createWebviewPanel('catCoding', 'Cat Coding', vscode.ViewColumn.One, {
            enableScripts: true,
        });
        // Get path to resource on disk
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'media', '1.jpg'));
        console.log(context.extensionPath, onDiskPath);
        // And get the special URI to use with the webview
        const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
        panel.webview.html = getWebviewContent(catGifSrc, panel.webview, context);
        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'alert':
                    vscode.window.showErrorMessage(message.text);
                    return;
            }
        }, undefined, context.subscriptions);
    }));
    // Our new command
    context.subscriptions.push(vscode.commands.registerCommand('turing.doNum', () => {
        if (!panel) {
            return;
        }
        // Send a message to our webview.
        // You can send any JSON serializable data.
        panel.webview.postMessage({ command: 'refactor' });
    }));
}
exports.activate = activate;
function getWebviewContent(cat, webview, context) {
    // Local path to main script run in the webview
    const scriptPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'media', 'main.js'));
    console.log(scriptPathOnDisk);
    // And the uri we use to load this script in the webview
    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
    console.log(scriptUri);
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Cat Coding</title>
		<style>body.vscode-light {
			color: black;
		}
		
		body.vscode-dark {
			color: white;
		}
		
		body.vscode-high-contrast {
			color: red;
		}</style>
</head>
<body>123123
		<img src="${cat}" width="300" />
		<h1 id="lines-of-code-counter">0</h1>

		<script src="${scriptUri}"></script>
</body>
</html>`;
}
//# sourceMappingURL=extension.js.map