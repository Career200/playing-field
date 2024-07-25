export const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Текст скопирован в буфер обмена!');
    }).catch(err => {
      alert('Ошибка при копировании: ' + err);
    });
};