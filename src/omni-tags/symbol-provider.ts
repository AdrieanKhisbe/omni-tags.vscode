import * as vscode from 'vscode';
import {keywordTagRegex} from './tags-definitions';

export class OmniTagDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    public provideDocumentSymbols(
        document: vscode.TextDocument, token: vscode.CancellationToken):
        Thenable<vscode.SymbolInformation[]> {
     const pattern = new RegExp(keywordTagRegex, 'g');
     const symbols = [];
     let match;
     const documentText = document.getText();
     while (match = pattern.exec(documentText)){
         const range = new vscode.Range(
             document.positionAt(match.index),
             document.positionAt(match.index + match[0].length)
            );
            symbols.push(new vscode.SymbolInformation(`§${match[3]}`, vscode.SymbolKind.Constant, range));
     }
     return Promise.resolve(symbols);
    }
}
