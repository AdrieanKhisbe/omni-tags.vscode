import * as vscode from 'vscode';
import { keywordTagRegex } from './tags-definitions';

export function createApplyGutterFunction(context: vscode.ExtensionContext) {

	const omniTagDecorator = vscode.window.createTextEditorDecorationType(
		{
			gutterIconPath: context.asAbsolutePath('resources/dark/reference-mark.svg'),
			gutterIconSize: '75%' // ¤note: ou “contain”
		}
	)
	context.subscriptions.push(omniTagDecorator);

	const applyGutterIcons = (editor?: vscode.TextEditor) => {
		if (!editor) return;
		const pattern = new RegExp(keywordTagRegex, 'g');
		const ranges = [];
		let match;
		const documentText = editor.document.getText();
		while (match = pattern.exec(documentText)) {
			ranges.push(new vscode.Range(
				editor.document.positionAt(match.index),
				editor.document.positionAt(match.index + match[0].length)
			));
		}
		editor.setDecorations(omniTagDecorator, ranges);
	}
	return applyGutterIcons;
}