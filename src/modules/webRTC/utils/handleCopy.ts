export const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        console.info('copied');
    }).catch(err => {
        console.error('copy error' + err);
    });
};