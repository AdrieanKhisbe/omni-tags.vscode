export const primarySymbol = '§';
export const secondarySymbol = '¤';
export const tertiarySymbol = '※';

export const symbolRegex = new RegExp(`[${primarySymbol}${secondarySymbol}${tertiarySymbol}]`);
export const simpleTagRegex = new RegExp(`${symbolRegex.source}+(?!\\S*:(\\s|$))\\w[\\w-:]*[!\\?¡¿]*(?=\\s|$)`);
export const keywordTagRegex = new RegExp(`(${symbolRegex.source}+)(?!\\S*:(\\s|$))(\\w[\\w-:]*)(?=\\s|$|:)`);
export const detailTagRegex = new RegExp(`${symbolRegex.source}+\\w[\\w-:]*:\\s(\\\\['"\`]|[^'"\`])*(?=\\z|$)`);
