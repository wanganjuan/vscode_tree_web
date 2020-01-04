"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
let command1 = vscode.commands.registerCommand('extension.aaa', function (uri) {
    // 工程目录一定要提前获取，因为创建了webview之后activeTextEditor会不准确
    const panel = vscode.window.createWebviewPanel('testWebview', // viewType
    "模式可视化", // 视图标题
    vscode.ViewColumn.One, // 显示在编辑器的哪个部位
    {
        enableScripts: true,
        retainContextWhenHidden: true,
    });
    panel.webview.html = `<html style=" height: 100%;"><body style=" height: 100%;"><iframe src="http://47.101.10.189/" height="100%" width="100%"></iframe></body></html>`;
});
exports.default = command1;
//# sourceMappingURL=command.js.map