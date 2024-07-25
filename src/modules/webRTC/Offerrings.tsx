import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { useCallback, useRef, useState } from "react";
import { ShouldRender } from "../components/ShouldRender";
import { TextArea } from "../components/TextArea";
import { Loader } from "../components/Loader";
import { webRTC_connection } from "./utils/webRTC_class";
import { handleCopy } from "./utils/handleCopy";

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
    const buttonOfferCopy = useRef<HTMLButtonElement>(null);
    const buttonAnswerPasted = useRef<HTMLButtonElement>(null);

    const [showOffer, setShowOffer] = useState<boolean>(false);
    const [offerIsLoading, setOfferIsLoading] = useState<boolean>(false);
    const [offer, setOffer] = useState<string>("")
    
    const createOffer = useCallback(async () => {
        console.info('create Offer');   
        
        const offerCreated = await webRTCConnection?.createOffer(lastIceCandidate);
        if (!offerCreated) return;

        offerButton.current!.disabled = true;

        setShowOffer(false)
        setOfferIsLoading(true)
        console.info('Create Offer Done');
        setShowOffer(false)
    }, [setShowOffer, setOfferIsLoading, webRTCConnection]);

    const lastIceCandidate = useCallback((peerConnection: RTCPeerConnection | null) => {
        console.info('Last Ice Candidate', peerConnection);

        const offer = peerConnection?.localDescription;
        console.info("Offer ", offer);
        setOffer(JSON.stringify(offer));

        setShowOffer(true);
        setOfferIsLoading(false);
        console.info("Offer Processed");
    }, [setOffer, setShowOffer, setOfferIsLoading])

    const clickAnswerPasted = useCallback(async () => {
        console.info('Answer Pasted');

        const answer = JSON.parse(textAreaAnswer.current!.value);
   
        const answerDone = await webRTCConnection?.handleAnswer(answer);
        if (!answerDone) return;

        buttonAnswerPasted.current!.disabled = true;
        textAreaAnswer.current!.readOnly = true;
    }, [webRTCConnection])

    return (
        <Box flexDirection="column" fontSize={12} justifyContent="center">
            <Button 
                id="buttoncreateoffer" 
                onClick={createOffer}
                border="lightgrey"
                boxShadow="inset 0px 0px 5px 5px lightgrey"
                ref={offerButton}
            >Create Offer</Button>

            <Loader isLoading={offerIsLoading}/>

            <ShouldRender shouldRender={showOffer}>
                <Box id="spanoffer" flexDirection="column" padding={10} ref={spanOffer}>
                    please copy the offer below and send it to a peer.
                    <TextArea 
                        id="textOffer" 
                        readOnly 
                        resize="none"
                        width="100%"
                        height={40}
                        value={offer}
                        placeholder="please wait a few seconds" 
                        ref={textAreaOffer}
                    />

                    <Button 
                        id="buttonOfferCopy" 
                        border="lightgrey"
                        boxShadow="inset 0px 0px 5px 5px lightgrey"
                        onClick={() => handleCopy(textAreaOffer.current?.value as string)} 
                        ref={buttonOfferCopy}
                    >copy offer</Button>

                    please wait for peer to give answer and paste it below

                    <TextArea 
                        id="textanswer" 
                        resize="none"
                        width="100%"
                        height={40}
                        placeholder="please paste answer from peer"
                        ref={textAreaAnswer}/>
                    <Button 
                        id="buttonanswerpasted" 
                        onClick={clickAnswerPasted}
                        border="lightgrey"
                        boxShadow="inset 0px 0px 5px 5px lightgrey"
                        ref={buttonAnswerPasted}
                    >answer pasted</Button>
                </Box>
            </ShouldRender>
            
        </Box>
    );
}
