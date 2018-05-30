const vscode = require('vscode');
const _ = require('lodash');
const basicEditing = require('./basic-editing');

function activate(context) {
    const editingCommands = basicEditing(vscode);
    _.each(editingCommands, (handler, command) => {
        const disposable = vscode.commands.registerTextEditorCommand(`omni-tags.editing.${command}`, handler);
        context.subscriptions.push(disposable);
    });
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;