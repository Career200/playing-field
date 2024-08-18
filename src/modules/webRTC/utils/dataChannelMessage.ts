import { chatlog } from "./chatlog";

/**
 * function to get data from ressived message and paste to chat
 * @param message
 */

export const dataChannelMessage = (message: MessageEvent) => {
  console.info("Message to channel ", message);
  const parsedMessage = JSON.parse(message.data);
  const userName =
    parsedMessage.userName ||
    (document.getElementById("user-name")?.innerHTML as string);
  const text = parsedMessage.text;
  chatlog(text, userName);
};
