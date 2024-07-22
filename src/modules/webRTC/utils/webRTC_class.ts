import { chatlog } from "./chatlog";
import data from "../config.json";
import { dataChannelMessage } from "./dataChannelMessage";
import { dataChannelOpen } from "./dataChannelOpen";

const configuration = data;

export class webRTC_connection {

    peerConnection: RTCPeerConnection | null;
    lastIceCandidate: RTCIceCandidate | null;
    dataChannel : RTCDataChannel | null;

    constructor() {
        this.lastIceCandidate = null;
        this.peerConnection = null;
        this.dataChannel = null;  
    }

    createPeerConnection = (lastIceCandidateHandler: any) => {
        try {
             this.peerConnection = new RTCPeerConnection(configuration);
            console.log(this.peerConnection);
        } catch(err) {
            chatlog('error: ' + err);
            return;
        }

        this.peerConnection.onconnectionstatechange = this.handleConnectionStateChange;
        this.peerConnection.oniceconnectionstatechange = this.handleiceconnectionstatechange;
        this.peerConnection.onicecandidate = this.handleIceCandidate(lastIceCandidateHandler);
    }

    handleIceCandidate = (lasticecandidate: any) => {

        return (event: any) => {
          if (event.candidate != null) {
            console.log('new ice candidate');
          } else {
            console.log('all ice candidates');
            lasticecandidate(this.peerConnection);
          }
        }
      }

    handleConnectionStateChange = (event: any) => {
        console.log('Connection State Changed');
        console.log(event);
    }

    handleiceconnectionstatechange = (event: any) => {
        console.log('ice connection state: ' + event.target.iceConnectionState);
    }

    setRemoteDone = () => {
        console.log('setRemoteDone');
        if (!this.peerConnection) return false;

        try {
            const answer = this.peerConnection.createAnswer();
            this.createAnswerDone(answer);
            return true;
        } catch (error) {
            this.createAnswerFailed(error);
            return false;
        }
      }
      
    setRemoteFailed = (reason: any) => {
        console.log('setRemoteFailed');
        console.log(reason);
        return false;
      }
    
    setLocalDone = () => {
        console.log('setLocalDone');
        return true;
      }
      
    setLocalFailed = (reason: any) => {
        console.log('setLocalFailed');
        console.log(reason);
        return false;
      }
    
    createAnswerDone = async (answer: any) => {
        console.log('createAnswerDone');

        if (!this.peerConnection) return false;

        try {
            await this.peerConnection.setLocalDescription(answer);
            this.setLocalDone();
            return true;
        } catch (error) {
            this.setLocalFailed(error);
            return false;
        }
    };
    
    createAnswerFailed = (reason: any) => {
        console.log('createAnswerFailed');
        console.log(reason);
    };
    
    createOfferDone = async (offer: any) => {
        if (!this.peerConnection) return false;

        try {
            this.peerConnection.setLocalDescription(offer);
            return this.setLocalDone();
        } catch (error) {
            this.setLocalFailed(error);
            return false;
        }
      }
    
    createOfferFailed = (reason: any) => {
        console.log('createOfferFailed');
        console.log(reason);
      }

    createOffer = async (lastIceCandidateHandler: any) => {
        console.log('create Offer', this.lastIceCandidate);    
        this.createPeerConnection(lastIceCandidateHandler);

        if (!this.peerConnection) return false;

        this.dataChannel = this.peerConnection.createDataChannel('chat');
        this.dataChannel.onopen = dataChannelOpen;
        this.dataChannel.onmessage = dataChannelMessage;

        try {
            const offer = await this.peerConnection.createOffer();
            return await this.createOfferDone(offer);
        } catch (error) {
            this.createOfferFailed(error);
            return false;
        }    
    };

    handleOffer = async (lastIceCandidateHandler: any, offer: any) => {
        console.log('clickremoteoffer');

        this.createPeerConnection(lastIceCandidateHandler);

        if (!this.peerConnection) return false;

        this.peerConnection.ondatachannel = this.handleDataChannel;

         console.log("dataChannel", this.dataChannel)
        try {
            await this.peerConnection.setRemoteDescription(offer);
            return this.setRemoteDone();
        } catch (error) {
            return this.setRemoteFailed(error);
        }
    };

    handleDataChannel = (event: any) => {
        console.log('handledatachannel', event);

        this.dataChannel = event.channel;
    
        if (!this.dataChannel) return false;

        this.dataChannel.onopen = dataChannelOpen;
        this.dataChannel.onmessage = dataChannelMessage;
        console.log("chanel handled", this.dataChannel)
    };

    handleAnswer = async (answer: any) => {
        console.log("processing answer")
        if (!this.peerConnection) return false;

        try {
            await this.peerConnection.setRemoteDescription(answer);
            return this.setRemoteDone();
        } catch (error) {
            return this.setRemoteFailed(error);
        }
    };

}