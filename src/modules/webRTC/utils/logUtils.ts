export const handleConnectionStateChange = (event: Event) => {
    console.log('Connection State Changed');
    console.log(event);
}

export const handleIceConnectionStateChange = (event: Event) => {
    const eventTarget = event.target as RTCPeerConnection;
    console.log('ice connection state: ' + eventTarget.iceConnectionState);
}