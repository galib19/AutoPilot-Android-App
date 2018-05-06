export function isTextInputEmpty(text) {
    if (!text || text.trim().length === 0) {
        return true;
    }
    return false;
}

export function isObjectEmpty(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function getStringValue(value) {
    if (value && value !== null && value.length > 0) {
        return String(value);
    }
    return '';
}