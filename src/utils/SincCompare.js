export const isNulled = (value) => {
    return value == undefined || value == null;
}

export const isValued = (value) => {
    return value !== undefined && value !== null;
}

export const isEmpty = (value) => {
    return value === undefined || value === null || value === "" || value === " ";
}

export const isZero = (value) => {
    return value === 0 || value === "0" || value === "0,00";
}

export const isArrayEmpty = (value) => {
    return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)
}

export const isHoraEmpty = (value) => {
    return value === undefined || value === null || value === "" || value === "00:00";
}

export const isFunction = (value) => {
    return typeof (value) == 'function';
}

export const isPromise = (value) => {
    return value instanceof Promise;
}