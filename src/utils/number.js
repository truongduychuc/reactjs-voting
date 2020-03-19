export const toInteger = num => parseInt(num, 10);

export const toFloat = num => parseFloat(num);

export const toFixed = (num, precision) => toFloat(num).toFixed(toInteger(precision || 0));


