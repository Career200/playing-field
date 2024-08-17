/**
 * function to paste messages to chat
 * @param msg 
 */

//TODO fix this function to avoid document...
export const chatlog = (msg: string, userName: string) => {
    const chatelement = document.getElementById('chat-log') as HTMLElement;
    const newchatentry = document.createElement("p");
    const date = new Date();
    const currentTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');
    newchatentry.textContent = `${userName}, [${currentTime}] : ${msg}`;
    chatelement.appendChild(newchatentry);  
    chatelement.scrollTop = chatelement.scrollHeight
  }