const primarySymbol = '§';
const secondarySymbol = '¤';
const tertiarySymbol = '※';

const symbolRegex = new RegExp(`[${primarySymbol}${secondarySymbol}${tertiarySymbol}]`);
const simpleTagRegex = new RegExp(`${symbolRegex.source}(?!.*:(\\s|$))\\w[\\w-:]*[!\\?¡¿]*(?=\\s|$)`);
const detailTagRegex = new RegExp(`${symbolRegex.source}\\w[\\w-:]*:\\s(\\\\['"\`]|[^'"\`])*(?=\\z|$)`);


module.exports = {
    primarySymbol,
    secondarySymbol,
    tertiarySymbol,
    symbolRegex,
    simpleTagRegex,
    detailTagRegex
};
