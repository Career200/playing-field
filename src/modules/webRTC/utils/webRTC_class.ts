import { chatlog } from "./chatlog";
import data from "../config.json";
import { dataChannelMessage } from "./dataChannelMessage";
import { dataChannelOpen } from "./dataChannelOpen";
import { handleConnectionStateChange, handleIceConnectionStateChange } from "./logUtils";

const configuration = data;

type CandidateHandler = (peerConnection: RTCPeerConnection | null) => void

export class webRTC_connection {

    peerConnection: RTCPeerConnection | null;
    lastIceCandidate: RTCIceCandidate | null;
    dataChannel : RTCDataChannel | null;

    constructor() {
        this.lastIceCandidate = null;
        this.peerConnection = null;
        this.dataChannel = null;  
    }

    /**
     * main method to create P-to-P connection
     * @param lastIceCandidateHandler 
     * @returns 
     */
    createPeerConnection = (lastIceCandidateHandler: CandidateHandler) => {

        try {
            this.peerConnection = new RTCPeerConnection(configuration);
        } catch(err) {
            chatlog('error: ' + err, "ERROR");
            console.info('error: ' + err);
            return;
        }

        // iterate through candidates to handle last one
        const handleIceCandidate = (lastIceCandidate: CandidateHandler) => {
            return (event: any) => {
              if (event.candidate != null) {
                console.info('new ice candidate');
              } else {
                console.info('all ice candidates');
                lastIceCandidate(this.peerConnection);
              }
            }
          }

        // loging for check state
        this.peerConnection.onconnectionstatechange = handleConnectionStateChange;
        this.peerConnection.oniceconnectionstatechange = handleIceConnectionStateChange;
        // handle last created candidate to make connection stable
        this.peerConnection.onicecandidate = handleIceCandidate(lastIceCandidateHandler);
    }

    setRemoteDone = async () => {
        try {
            const answer = await this.peerConnection!.createAnswer();
            this.createAnswerDone(answer);
            return true;
        } catch (error) {
            this.createAnswerFailed(error);
            return false;
        }
    };
    
    createAnswerDone = async (answer: RTCLocalSessionDescriptionInit) => {
        try {
            await this.peerConnection!.setLocalDescription(answer);
            this.setLocalDone();
            return true;
        } catch (error) {
            this.setLocalFailed(error);
            return false;
        }
    };
    
    createAnswerFailed = (reason: unknown) => {
        console.error('Create Answer Failed ', reason);
    };
      
    setRemoteFailed = (reason: unknown) => {
        console.error('Remote Failed ', reason);
        return false;
    };
    
    setLocalDone = () => {
        console.info('set Local Done!');
        return true;
    };
      
    setLocalFailed = (reason: unknown) => {
        console.error('Local Failed ', reason);
        return false;
    };
    
    /**
     * method to create offer from offerings
     * @param lastIceCandidateHandler 
     * @returns 
     */
    createOffer = async (lastIceCandidateHandler: CandidateHandler) => {
        console.info('create Offer Start');    
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

    createOfferDone = async (offer: RTCLocalSessionDescriptionInit) => {
        try {
            await this.peerConnection!.setLocalDescription(offer);
            return this.setLocalDone();
        } catch (error) {
            this.setLocalFailed(error);
            return false;
        }
    };
    
    createOfferFailed = (reason: unknown) => {
        console.error('Create Offer Failed', reason);
    };


    /**
     * method to handle offer from other session
     * @param lastIceCandidateHandler 
     * @param offer 
     * @returns 
     */
    handleOffer = async (lastIceCandidateHandler: CandidateHandler, offer: RTCSessionDescriptionInit) => {
        console.info("Handle Offer Start")
        this.createPeerConnection(lastIceCandidateHandler);

        if (!this.peerConnection) return false;

        this.peerConnection.ondatachannel = this.handleDataChannel;

        try {
            await this.peerConnection.setRemoteDescription(offer);
            return this.setRemoteDone();
        } catch (error) {
            return this.setRemoteFailed(error);
        }
    };

    handleDataChannel = (event: RTCDataChannelEvent) => {
        console.info('Start handle Data Channel');

        this.dataChannel = event.channel;
    
        if (!this.dataChannel) return false;

        this.dataChannel.onopen = dataChannelOpen;
        this.dataChannel.onmessage = dataChannelMessage;
        console.info("Channel handled", this.dataChannel)
    };

    handleAnswer = async (answer: RTCSessionDescriptionInit) => {
        console.info("processing answer")

        try {
            await this.peerConnection!.setRemoteDescription(answer);
            return this.setRemoteDone();
        } catch (error) {
            return this.setRemoteFailed(error);
        }
    };

}