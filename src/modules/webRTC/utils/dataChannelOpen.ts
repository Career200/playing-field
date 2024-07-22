import { chatlog } from "./chatlog";

export const dataChannelOpen = (event: any) => {
    console.log('datachannelopen', event);
    chatlog('connected');
  }