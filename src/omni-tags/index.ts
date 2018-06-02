import * as vscode from 'vscode';
import * as _ from 'lodash';
import editingCommands from './basic-editing';
import navigationCommands from './navigation';
import {OmniTagDocumentHighlightProvider} from './highlight-provider';

const OMNI_TAG_MODE: vscode.DocumentFilter = { scheme: 'file' };

export function activate(context: vscode.ExtensionContext) {
    _.each(editingCommands, (handler, command) => {
        const disposable = vscode.commands.registerTextEditorCommand(`omni-tags.editing.${command}`, handler);
        context.subscriptions.push(disposable);
    });
    _.each(navigationCommands, (handler, command) => {
        const disposable = vscode.commands.registerCommand(`omni-tags.navigate.${command}`, handler);
        context.subscriptions.push(disposable);
    });

    context.subscriptions.push(
        vscode.languages.registerDocumentHighlightProvider(
            OMNI_TAG_MODE, new OmniTagDocumentHighlightProvider()));

}
export function deactivate() {};