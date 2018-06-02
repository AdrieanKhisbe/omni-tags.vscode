const { symbolRegex } = require('./tags-definitions');

module.exports = function (vscode) {

    const tagSymbol = new RegExp(`${symbolRegex.source}+`, 'g');
    const startWithTag = new RegExp(`^${symbolRegex.source}`);

    const gotoNextTag = args => {
        const n = args.n || 1;
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;
        const lastLine = document.lineCount - 1;
        const forwardRange = new vscode.Range(editor.selection.anchor.line, editor.selection.anchor.character,
            lastLine, document.lineAt(lastLine).range.end.character)
        const text = document.getText(forwardRange);

        const moveToTag = match => {
            const tagPosition = document.positionAt(document.offsetAt(editor.selection.start) + match.index);
            editor.selection = new vscode.Selection(tagPosition, tagPosition);
            return tagPosition;
        }
        let i = 0, match;
        if (startWithTag.test(text)) match = tagSymbol.exec(text);
        while (i < n) {
            match = tagSymbol.exec(text);

            if (match) {
                moveToTag(match);
            } else break;
            i++;
        }
        vscode.commands.executeCommand("revealLine", {
            lineNumber: editor.selection.start.line
        });
    }

    const gotoPreviousTag = (args) => {
        const n = args.n || 1;
        const editor = vscode.window.activeTextEditor;
        const document = editor.document;
        const backwardRange = new vscode.Range(0, document.lineAt(0).range.start.character,
            editor.selection.anchor.line, editor.selection.anchor.character)
        const text = document.getText(backwardRange);

        const moveToTag = match => {
            const tagPosition = document.positionAt(match.index);
            editor.selection = new vscode.Selection(tagPosition, tagPosition);
            return tagPosition;
        }
        const matchStack = [];
        let match, i = 0;
        while (match = tagSymbol.exec(text)) matchStack.push(match);

        if (startWithTag.test(text)) matchStack.pop();
        while (i < n) {
            const backwardMatch = matchStack.pop()
            if (backwardMatch) moveToTag(backwardMatch);
            else break;
            i++;
        }

        vscode.commands.executeCommand("revealLine", {
            lineNumber: editor.selection.start.line
        });
    }

    return {
        gotoNextTag,
        gotoPreviousTag
    };

}