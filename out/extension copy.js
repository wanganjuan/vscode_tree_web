"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
function activate(context) {
    // Only allow a single Cat Coder
    let panel = undefined;
    context.subscriptions.push(vscode.commands.registerCommand('turing.code', () => {
        panel = vscode.window.createWebviewPanel('catCoding', 'Cat Coding', vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true // webview被隐藏时保持状态，避免被重置
        });
        // Get path to resource on disk
        const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'media', '1.jpg'));
        console.log(context.extensionPath, onDiskPath);
        // And get the special URI to use with the webview
        const catGifSrc = panel.webview.asWebviewUri(onDiskPath);
        panel.webview.html = getWebviewContent(catGifSrc);
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
function getWebviewContent(cat) {
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

		<script>
		const vscode = acquireVsCodeApi();
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
				}, 100);
				// Handle the message inside the webview
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent
						console.log(message)
            switch (message.command) {
                case 'refactor':
                    count = Math.ceil(count * 0.5);
                    counter.textContent = count;
                    break;
            }
				});
				if (count > 100) {
					vscode.postMessage({
							command: 'alert',
							text: '🐛  on line ' + count
					})
			}
    </script>
</body>
</html>`;
}
//# sourceMappingURL=extension copy.js.map