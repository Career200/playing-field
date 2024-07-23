import { chatlog } from "./chatlog";

/**
 * just logging connection
 * @param event 
 */
export const dataChannelOpen = (event: Event) => {
    console.log('data channel opened :', event);
    chatlog('connected', "INFO");
  }