const primarySymbol = '§';
const secondarySymbol = '¤';
const tertiarySymbol = '※';

const symbolRegex = `[${primarySymbol}${secondarySymbol}${tertiarySymbol}]`;
const simpleTagRegex = new RegExp(`${symbolRegex}(?!.*:(\\s|$))\\w[\\w-:]*[!\\?¡¿]*(?=\\s|$)`);


module.exports = {
    primarySymbol,
    secondarySymbol,
    tertiarySymbol,
    symbolRegex,
    simpleTagRegex
};
