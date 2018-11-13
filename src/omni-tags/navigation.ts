import * as vscode from 'vscode';
import { symbolRegex, keywordTagRegex } from './tags-definitions';

export interface NavigationArg {
    n?: number;
}

export const gotoNextTag = (args: NavigationArg) => {
    const n = args && args.n || 1;
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const document = editor.document;
    const lastLine = document.lineCount - 1;
    const forwardRange = new vscode.Range(editor.selection.anchor.line, editor.selection.anchor.character,
        lastLine, document.lineAt(lastLine).range.end.character)
    const text = document.getText(forwardRange);

    const tagSymbol = new RegExp(`${symbolRegex.source}+`, 'g');
    const startWithTag = new RegExp(`^${symbolRegex.source}`);
    let i = 0, match;
    if (startWithTag.test(text)) match = tagSymbol.exec(text);
    while (i < n) {
        match = tagSymbol.exec(text);
        i++;
    }
    console.log(match)
    if (match) { // move to tag
        const tagPosition = document.positionAt(document.offsetAt(editor.selection.start) + match.index);
        editor.selection = new vscode.Selection(tagPosition, tagPosition);
        vscode.commands.executeCommand("revealLine", {
            lineNumber: editor.selection.start.line
        });
    } else {
        vscode.window.showWarningMessage('No further tags ahead');
    }
};


export const gotoPreviousTag = (args: NavigationArg) => {
    const n = args && args.n || 1;
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const document = editor.document;
    const backwardRange = new vscode.Range(0, document.lineAt(0).range.start.character,
        editor.selection.anchor.line, editor.selection.anchor.character)
    const text = document.getText(backwardRange);

    const tagSymbol = new RegExp(`${symbolRegex.source}+`, 'g');
    const startWithTag = new RegExp(`^${symbolRegex.source}`);
    const matchStack = [];
    let match, i = 0, backwardMatch;
    while (match = tagSymbol.exec(text)) matchStack.push(match);

    if (startWithTag.test(text)) matchStack.pop();
    while (i < n) {
        backwardMatch = matchStack.pop();
        i++;
    }
    if (backwardMatch) {
        const tagPosition = document.positionAt(backwardMatch.index);
        editor.selection = new vscode.Selection(tagPosition, tagPosition);
        vscode.commands.executeCommand("revealLine", {
            lineNumber: editor.selection.start.line
        });
    } else {
        vscode.window.showWarningMessage('No further tags behind');
    }
};
/*
Code for similar tag:
    const position = editor.selection.active;
    const currentTag = document.getText(document.getWordRangeAtPosition(position, keywordTagRegex));
    // §TODO: remove the symbol tag
    vscode.window.showErrorMessage("test " + JSON.stringify(test))
*/

export default {
    gotoNextTag, gotoPreviousTag
};