import { chatlog } from "./chatlog";

/**
 * function to get data from ressived message and paste to chat
 * @param message 
 */

export const dataChannelMessage = (message: MessageEvent) => {
    console.log('Message to channel');
    console.log(message);
    const parsedMessage = JSON.parse(message.data);
    const userName = parsedMessage.userName || document.getElementById("userName")?.innerHTML as string;
    const text = parsedMessage.text;
    chatlog(text, userName);
  }