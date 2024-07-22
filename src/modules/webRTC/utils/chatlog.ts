export const chatlog = (msg: string) => {
    const chatelement = document.getElementById('chatlog') as HTMLElement;
    const newchatentry = document.createElement("p");
    newchatentry.textContent = '[' + new Date() + '] ' + msg;
    chatelement.appendChild(newchatentry);  
    chatelement.scrollTop = chatelement.scrollHeight
  }