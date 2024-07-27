export const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        console.info('Текст скопирован в буфер обмена!');
    }).catch(err => {
        console.error('Ошибка при копировании: ' + err);
    });
};