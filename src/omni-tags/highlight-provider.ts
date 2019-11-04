import * as vscode from 'vscode';
import {keywordTagRegex} from './tags-definitions';

export class OmniTagDocumentHighlightProvider implements vscode.DocumentHighlightProvider {
    public provideDocumentHighlights(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.DocumentHighlight[] | Thenable<vscode.DocumentHighlight[]> {
        const test = document.getWordRangeAtPosition(position, keywordTagRegex);
        if (!test) return [];
        const tagPattern = document.getText(test);
        const matches = [];
        const pattern = new RegExp(tagPattern, 'g');
        let match;
        const documentText = document.getText();
        while ((match = pattern.exec(documentText))) {
            const range = new vscode.Range(
                document.positionAt(match.index),
                document.positionAt(match.index + match[0].length)
            );
            matches.push(new vscode.DocumentHighlight(range));
        }
        return matches;
    }
}
