const { symbolRegex } = require('./tags-definitions');

module.exports = function () {
    const vscode = require('vscode')
    const gotoNextTag = (n = 1) => {
        const tagSymbol = new RegExp(`${symbolRegex.source}+`, 'g')
        const startWithTag = new RegExp(`^${symbolRegex.source}`)
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;
        const lastLine = document.lineCount - 1;
        const forwardRange = new vscode.Range(editor.selection.anchor.line, editor.selection.anchor.character,
            lastLine, document.lineAt(lastLine).range.end.character)
        const text = document.getText(forwardRange);
        let match = tagSymbol.exec(text);
        const moveToTag = match => {
            const tagPosition = document.positionAt(document.offsetAt(editor.selection.start) + match.index);
            editor.selection = new vscode.Selection(tagPosition, tagPosition);
            return tagPosition;
        }
        if (startWithTag.test(text)) {
            console.log('tsrta with tag')
            match = tagSymbol.exec(text)
        }
        if (match) {
            const initialPosition = editor.selection.anchor;
            const newPosition = moveToTag(match);
        }
    }
    return {
        gotoNextTag
    };
}