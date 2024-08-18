import { chatlog } from "./utils/chatlog";
import data from "./config.json";
import { dataChannelMessage } from "./utils/dataChannelMessage";
import { dataChannelOpen } from "./utils/dataChannelOpen";
import {
  doneHandler,
  failHandler,
  handleConnectionStateChange,
  handleIceConnectionStateChange,
} from "./utils/logUtils";

const configuration = data;

type CandidateHandler = (peerConnection: RTCPeerConnection | null) => void;

export class webRTC_connection {
  peerConnection: RTCPeerConnection | null;
  lastIceCandidate: RTCIceCandidate | null;
  dataChannel: RTCDataChannel | null;

  constructor() {
    this.lastIceCandidate = null;
    this.peerConnection = null;
    this.dataChannel = null;
  }

  /**
   * main method to create P-to-P connection
   */
  createPeerConnection = (lastIceCandidateHandler: CandidateHandler) => {
    try {
      this.peerConnection = new RTCPeerConnection(configuration);
    } catch (err) {
      chatlog("error: " + err, "ERROR");
      console.info("error: " + err);
      return;
    }

    // iterate through candidates to handle last one
    const handleIceCandidate = (lastIceCandidate: CandidateHandler) => {
      return (event: any) => {
        if (event.candidate != null) {
          console.info("new ice candidate");
        } else {
          console.info("all ice candidates");
          lastIceCandidate(this.peerConnection);
        }
      };
    };

    // loging for check state
    this.peerConnection.onconnectionstatechange = handleConnectionStateChange;
    this.peerConnection.oniceconnectionstatechange =
      handleIceConnectionStateChange;
    // handle last created candidate to make connection stable
    this.peerConnection.onicecandidate = handleIceCandidate(
      lastIceCandidateHandler,
    );
  };

  setRemoteDone = async () => {
    try {
      const answer = await this.peerConnection!.createAnswer();
      return await this.createAnswerDone(answer);
    } catch (error) {
      return failHandler(error, "Create Answer Failed ");
    }
  };

  createAnswerDone = async (answer: RTCLocalSessionDescriptionInit) => {
    try {
      await this.peerConnection!.setLocalDescription(answer);
      return doneHandler("set Local Done!");
    } catch (error) {
      return failHandler(error, "Local Failed ");
    }
  };

  /**
   * method to create offer from offerings
   * @param lastIceCandidateHandler
   */
  createOffer = async (lastIceCandidateHandler: CandidateHandler) => {
    console.info("create Offer Start");
    this.createPeerConnection(lastIceCandidateHandler);

    if (!this.peerConnection) return false;

    this.dataChannel = this.peerConnection.createDataChannel("chat");
    this.dataChannel.onopen = dataChannelOpen;
    this.dataChannel.onmessage = dataChannelMessage;

    try {
      const offer = await this.peerConnection.createOffer();
      return await this.createOfferDone(offer);
    } catch (error) {
      failHandler(error, "Create Offer Failed...");
      return false;
    }
  };

  createOfferDone = async (offer: RTCLocalSessionDescriptionInit) => {
    try {
      await this.peerConnection!.setLocalDescription(offer);
      return doneHandler("set Local Done!");
    } catch (error) {
      return failHandler(error, "Local Failed ");
    }
  };

  /**
   * method to handle offer from other session
   * @param lastIceCandidateHandler
   * @param offer
   */
  handleOffer = async (
    lastIceCandidateHandler: CandidateHandler,
    offer: RTCSessionDescriptionInit,
  ) => {
    console.info("Handle Offer Start");
    this.createPeerConnection(lastIceCandidateHandler);

    if (!this.peerConnection) return false;

    this.peerConnection.ondatachannel = this.handleDataChannel;

    try {
      await this.peerConnection.setRemoteDescription(offer);
      return this.setRemoteDone();
    } catch (error) {
      return failHandler(error, "Remote Failed...");
    }
  };

  handleDataChannel = (event: RTCDataChannelEvent) => {
    console.info("Start handle Data Channel");

    this.dataChannel = event.channel;

    if (!this.dataChannel) return false;

    this.dataChannel.onopen = dataChannelOpen;
    this.dataChannel.onmessage = dataChannelMessage;
    console.info("Channel handled", this.dataChannel);
  };

  handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.info("processing answer");

    try {
      await this.peerConnection!.setRemoteDescription(answer);
      return await this.setRemoteDone();
    } catch (error) {
      return failHandler(error, "Remote Failed...");
    }
  };
}
