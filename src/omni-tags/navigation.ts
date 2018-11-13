import * as vscode from 'vscode';
import { symbolRegex, keywordTagRegex } from './tags-definitions';

export interface NavigationArg {
    n?: number;
}

const moveToTag = (document: vscode.TextDocument, editor: vscode.TextEditor, match: RegExpExecArray) => {
    const tagPosition = document.positionAt(document.offsetAt(editor.selection.start) + match.index);
    editor.selection = new vscode.Selection(tagPosition, tagPosition);
    return tagPosition;
};

export const gotoNextTag = (args: NavigationArg) => {
    const n = args && args.n || 1;
    const tagSymbol = new RegExp(`${symbolRegex.source}+`, 'g');
    const startWithTag = new RegExp(`^${symbolRegex.source}`);
    const editor = vscode.window.activeTextEditor;
    if(!editor) return;
    const document = editor.document;
    const lastLine = document.lineCount - 1;
    const forwardRange = new vscode.Range(editor.selection.anchor.line, editor.selection.anchor.character,
        lastLine, document.lineAt(lastLine).range.end.character)
    const text = document.getText(forwardRange);

    let i = 0, match;
    if (startWithTag.test(text)) match = tagSymbol.exec(text);
    while (i < n) {
        match = tagSymbol.exec(text);

        if (match) {
            moveToTag(document, editor, match);
        } else {
            vscode.window.showWarningMessage('No further tags ahead');
            break;
        }
        i++;
    }
    vscode.commands.executeCommand("revealLine", {
        lineNumber: editor.selection.start.line
    });
}


export const gotoPreviousTag = (args: NavigationArg) => {
    const n = args && args.n || 1;
    const tagSymbol = new RegExp(`${symbolRegex.source}+`, 'g');
    const startWithTag = new RegExp(`^${symbolRegex.source}`);
    const editor = vscode.window.activeTextEditor;
    if(!editor) return;
    const document = editor.document;
    const backwardRange = new vscode.Range(0, document.lineAt(0).range.start.character,
        editor.selection.anchor.line, editor.selection.anchor.character)
    const text = document.getText(backwardRange);

    const matchStack = [];
    let match, i = 0;
    while (match = tagSymbol.exec(text)) matchStack.push(match);

    if (startWithTag.test(text)) matchStack.pop();
    while (i < n) {
        const backwardMatch = matchStack.pop()
        if (backwardMatch) moveToTag(document, editor, backwardMatch);
        else {
            vscode.window.showWarningMessage('No further tags behind');
            break;
        }
        i++;
    }

    vscode.commands.executeCommand("revealLine", {
        lineNumber: editor.selection.start.line
    });
}
/*
Code for similar tag:
    const position = editor.selection.active;
    const currentTag = document.getText(document.getWordRangeAtPosition(position, keywordTagRegex));
    // §TODO: remove the symbol tag
    vscode.window.showErrorMessage("test " + JSON.stringify(test))
*/

export default {
    gotoNextTag, gotoPreviousTag
}