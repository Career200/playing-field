import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import { ShouldRender } from "../components/ShouldRender";
import { TextArea } from "../components/TextArea";
import { Loader } from "../components/Loader";
import { webRTC_connection } from "./utils/webRTC_class";

type Props = {
    webRTCConnection: webRTC_connection | undefined;
    remoteDescription?: string;
    setRemoteDescription?: React.Dispatch<React.SetStateAction<string>>;  
    localDescription?: string; 
    setLocalDescription?: React.Dispatch<React.SetStateAction<string>>;
}

export const Offerings = ({ webRTCConnection }: Props) => {

    const offerButton = useRef<HTMLButtonElement>(null);
    const spanOffer = useRef<HTMLDivElement>(null);
    const textAreaOffer = useRef<HTMLTextAreaElement>(null);
    const textAreaAnswer = useRef<HTMLTextAreaElement>(null);
    const buttonOfferSent = useRef<HTMLButtonElement>(null);
    const buttonAnswerPasted = useRef<HTMLButtonElement>(null);

    const [showOffer, setShowOffer] = useState<boolean>(false);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [offerIsLoading, setOfferIsLoading] = useState<boolean>(false);
    const [offer, setOffer] = useState<string>("")
    
    const createOffer = async () => {
        console.info('create Offer');   
        
        const offerCreated = await webRTCConnection?.createOffer(lastIceCandidate);
        if (!offerCreated) return;

        offerButton.current!.disabled = true;

        setShowOffer(false)
        setOfferIsLoading(true)
        console.info('Create Offer Done');
    };

    const lastIceCandidate = (peerConnection: RTCPeerConnection | null) => {
        console.info('Last Ice Candidate', peerConnection);

        const offer = peerConnection?.localDescription;
        console.info("Offer ", offer);
        setOffer(JSON.stringify(offer));

        setShowOffer(true);
        setOfferIsLoading(false);
        console.info("Offer Processed");
      }

    const clickAnswerPasted = async () => {
        console.info('Answer Pasted');

        const answer = JSON.parse(textAreaAnswer.current!.value);
   
        const answerDone = await webRTCConnection?.handleAnswer(answer);
        if (!answerDone) return;

        buttonAnswerPasted.current!.disabled = true;
        textAreaAnswer.current!.readOnly = true;
      }

    return (
        <Box flexDirection="column" justifyContent="center">
            <Button 
                id="buttoncreateoffer" 
                onClick={createOffer}
                ref={offerButton}
            >Create Offer</Button>

            <Loader isLoading={offerIsLoading}/>

            <ShouldRender shouldRender={showOffer}>
                <Box id="spanoffer" flexDirection="column" ref={spanOffer}>
                    please copy the offer below and send it to a peer.
                    <TextArea 
                        id="textoffer" 
                        readOnly 
                        value={offer}
                        placeholder="please wait a few seconds" 
                        ref={textAreaOffer}
                    />

                    <Button 
                        id="buttonoffersent" 
                        onClick={() => {
                            setShowAnswer(!showAnswer);
                            buttonOfferSent.current!.disabled = true
                        }} 
                        ref={buttonOfferSent}
                    >offer sent</Button>
                </Box>
            </ShouldRender>

            <ShouldRender shouldRender={showAnswer}>
                please wait for peer to give answer and paste it below
                <TextArea 
                    id="textanswer" 
                    placeholder="please paste answer from peer"
                    ref={textAreaAnswer}/>
                <Button 
                    id="buttonanswerpasted" 
                    onClick={clickAnswerPasted}
                    ref={buttonAnswerPasted}
                >answer pasted</Button>
            </ShouldRender>
            
        </Box>
    );
}
