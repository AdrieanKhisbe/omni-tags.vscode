const primarySymbol = '§';
const secondarySymbol = '¤';
const tertiarySymbol = '※';

const symbolRegex = `[${primarySymbol}${secondarySymbol}${tertiarySymbol}]`;
const simpleTagRegex = new RegExp(`${symbolRegex}(?!.*:(\\s|$))\\w[\\w-:]*[!\\?¡¿]*(?=\\s|$)`);
const detailTagRegex = new RegExp(`${symbolRegex}\\w[\\w-:]*:\\s(\\\\['"\`]|[^'"\`])*(?=\\z|$)`);


module.exports = {
    primarySymbol,
    secondarySymbol,
    tertiarySymbol,
    symbolRegex,
    simpleTagRegex,
    detailTagRegex
};
