const vscode = require('vscode');
const _ = require('lodash');
const basicEditing = require('./basic-editing');
const navigation = require('./navigation');

function activate(context) {
    const editingCommands = basicEditing(vscode);
    const navigationCommands = navigation(vscode);

    _.each(editingCommands, (handler, command) => {
        const disposable = vscode.commands.registerTextEditorCommand(`omni-tags.editing.${command}`, handler);
        context.subscriptions.push(disposable);
    });
    _.each(navigationCommands, (handler, command) => {
        const disposable = vscode.commands.registerCommand(`omni-tags.navigate.${command}`, handler);
        context.subscriptions.push(disposable);
    }); 
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;