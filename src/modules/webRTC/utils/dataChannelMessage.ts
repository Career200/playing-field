import { chatlog } from "./chatlog";

export const dataChannelMessage = (message: MessageEvent) => {
    console.log('Message to channel');
    console.log(message);
    const text = message.data;
    chatlog(text);
  }