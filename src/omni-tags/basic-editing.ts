import * as vscode from 'vscode';
import {secondarySymbol, tertiarySymbol} from './tags-definitions';

const insertSymbol = (symb: string) => (
    textEditor: vscode.TextEditor,
    edit: vscode.TextEditorEdit
) => {
    const position = textEditor.selection.active;
    edit.insert(position, symb);
};

export const insertSecondarySymbol = insertSymbol(secondarySymbol);
export const insertTertiarySymbol = insertSymbol(tertiarySymbol);

export default {insertSecondarySymbol, insertTertiarySymbol};
