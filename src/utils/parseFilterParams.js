const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);
    if (isType(type)) return type;

};

const parseIsFavorite = (isFavourite) => {
    if (typeof isFavourite === "string") {
        if (isFavourite === "true") return true;
        if (isFavourite === "false") return false;
    }
     if (typeof isFavourite === "boolean") {
        return isFavourite;
    }

    return undefined;
};
export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseContactType(type);
    const parsedIsFavourite = parseIsFavorite(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite,
    };
};
