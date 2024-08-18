export const handleConnectionStateChange = (event: Event) => {
  console.info("Connection State Changed");
  console.info(event);
};

export const handleIceConnectionStateChange = (event: Event) => {
  const eventTarget = event.target as RTCPeerConnection;
  console.info("ice connection state: " + eventTarget.iceConnectionState);
};

export const failHandler = (reason: unknown, text: string) => {
  console.error(text, reason);
  return false;
};

export const doneHandler = (text: string) => {
  console.info(text);
  return true;
};
