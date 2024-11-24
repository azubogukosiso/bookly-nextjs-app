// CONVERT BASE 64 TO BLOB
export const base64ToBlob = (base64String, contentType) => {
    const prefixPattern = /^data:image\/\w+;base64,/; // STRIP OFF BASE 64 PREFIX
    const base64Data = base64String.replace(prefixPattern, '');

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}