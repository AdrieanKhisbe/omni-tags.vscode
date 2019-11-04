import * as vscode from 'vscode';
import {keywordTagRegex} from './tags-definitions';

export function createApplyGutterFunction(context: vscode.ExtensionContext) {
    const gutterIconSize = '75%'; // ¤note: ou “contain”
    const opacity = '0.9'; // §TODO: future use, toggle opacity, between meen and max
    const omniTagDecorator = vscode.window.createTextEditorDecorationType({
        dark: {
            gutterIconPath: context.asAbsolutePath('resources/dark/reference-mark.svg'),
            gutterIconSize,
            opacity
        },
        light: {
            gutterIconPath: context.asAbsolutePath('resources/light/reference-mark.svg'),
            gutterIconSize,
            opacity
        }
    });
    context.subscriptions.push(omniTagDecorator);

    const applyGutterIcons = (editor?: vscode.TextEditor) => {
        if (!editor) return;
        const pattern = new RegExp(keywordTagRegex, 'g');
        const ranges = [];
        let match;
        const documentText = editor.document.getText();
        while ((match = pattern.exec(documentText))) {
            ranges.push(
                new vscode.Range(
                    editor.document.positionAt(match.index),
                    editor.document.positionAt(match.index + match[0].length)
                )
            );
        }
        editor.setDecorations(omniTagDecorator, ranges);
    };
    return applyGutterIcons;
}
