export const handleIceCandidate = (lasticecandidate: any, peerConnection: RTCPeerConnection) => {

    return (event: any) => {
      if (event.candidate != null) {
        console.log('new ice candidate');
      } else {
        console.log('all ice candidates');
        lasticecandidate(peerConnection);
      }
    }
  }