export const hyphenateTitle = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}
