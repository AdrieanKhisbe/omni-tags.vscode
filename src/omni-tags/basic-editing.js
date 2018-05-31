const primarySymbol = '§';
const secondarySymbol = '¤';
const tertiarySymbol = '※';

module.exports = function (vscode) {
    const insertSymbol = symb => (textEditor, edit) => {
        const position = textEditor.selection.active;
        edit.insert(position, symb);
    };

    return {
        primarySymbol,
        secondarySymbol,
        tertiarySymbol,
        insertSecondarySymbol: insertSymbol(secondarySymbol),
        insertTertiarySymbol: insertSymbol(tertiarySymbol)
    };
}