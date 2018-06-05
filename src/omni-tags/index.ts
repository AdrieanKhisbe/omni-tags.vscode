import * as vscode from 'vscode';
import * as _ from 'lodash';
import editingCommands from './basic-editing';
import navigationCommands from './navigation';
import { OmniTagDocumentHighlightProvider } from './highlight-provider';
import { OmniTagDocumentSymbolProvider } from './symbol-provider'
import { OmniTagsNodeProvider } from './tags-outline';

const OMNI_TAGS_MODE: vscode.DocumentFilter = { scheme: 'file' };

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
            OMNI_TAGS_MODE, new OmniTagDocumentHighlightProvider()));
    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider(OMNI_TAGS_MODE, new OmniTagDocumentSymbolProvider()))

    const omniTagsTreeProvider = new OmniTagsNodeProvider();

	vscode.window.registerTreeDataProvider('omniTagsFileTree', omniTagsTreeProvider);
	vscode.commands.registerCommand('omni-tags.tree.refresh', () => omniTagsTreeProvider.refresh());
	// vscode.commands.registerCommand('omni-tags.tree.openSelection', range => omniTagsTreeProvider.select(range));

}
export function deactivate() { };