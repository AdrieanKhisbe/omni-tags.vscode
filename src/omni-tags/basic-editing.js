const {primarySymbol, secondarySymbol, tertiarySymbol} = require('./tags-definitions');

module.exports = function (vscode) {
    const insertSymbol = symb => (textEditor, edit) => {
        const position = textEditor.selection.active;
        edit.insert(position, symb);
    };

    return {
        insertSecondarySymbol: insertSymbol(secondarySymbol),
        insertTertiarySymbol: insertSymbol(tertiarySymbol)
    };
}