"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const ITEM_ICON_MAP = new Map([
    ['pig1', 'pig1.svg'],
    ['pig2', 'pig2.svg'],
    ['pig3', 'pig3.svg']
]);
// 第一步：创建单项的节点(item)的类
class TreeItemNode extends vscode_1.TreeItem {
    constructor(
    // readonly 只可读
    label, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        // command: 为每项添加点击事件的命令
        this.command = {
            title: this.label,
            command: 'turing.code',
            tooltip: this.label,
            arguments: [
                this.label,
            ]
        };
        // iconPath： 为该项的图标因为我们是通过上面的 Map 获取的，所以我额外写了一个方法，放在下面
        this.iconPath = TreeItemNode.getIconUriForLabel(this.label);
    }
    // __filename：当前文件的路径
    // 重点讲解 Uri.file(join(__filename,'..', '..') 算是一种固定写法 : out文件得原因
    // Uri.file(join(__filename,'..','assert', ITEM_ICON_MAP.get(label)+''));   写成这样图标出不来
    // 所以小伙伴们就以下面这种写法编写
    static getIconUriForLabel(label) {
        console.log(path_1.join(__filename, '..', '..', '..', 'tview', 'src', 'assert', ITEM_ICON_MAP.get(label) + ''));
        return vscode_1.Uri.file(path_1.join(__filename, '..', '..', '..', 'src', 'tview', 'assert', ITEM_ICON_MAP.get(label) + ''));
    }
}
exports.TreeItemNode = TreeItemNode;
class TreeViewProvider {
    // 自动弹出
    // 获取树视图中的每一项 item,所以要返回 element
    getTreeItem(element) {
        console.log(element);
        return element;
    }
    // 自动弹出，但是我们要对内容做修改
    // 给每一项都创建一个 TreeItemNode
    getChildren(element) {
        return ['pig1', 'pig2', 'pig3'].map(item => {
            return new TreeItemNode(item, vscode_1.TreeItemCollapsibleState.None);
        });
    }
    // 这个静态方法时自己写的，你要写到 extension.ts 也可以
    static initTreeViewItem() {
        console.log(123);
        // 实例化 TreeViewProvider
        const treeViewProvider = new TreeViewProvider();
        // registerTreeDataProvider：注册树视图
        // 你可以类比 registerCommand(上面注册 Hello World)
        vscode_1.window.registerTreeDataProvider('t-view', treeViewProvider);
    }
}
exports.TreeViewProvider = TreeViewProvider;
//# sourceMappingURL=treeview.js.map