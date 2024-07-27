import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { useCallback, useRef, useState } from "react";
import { ShouldRender } from "../../components/ShouldRender";
import { TextArea } from "../../components/TextArea";
import { Loader } from "../../components/Loader";
import { webRTC_connection } from "../baseWebRTC";
import { handleCopy } from "../utils/handleCopy";
import { buttonStyle, textAreaStyle } from "./styles";

type Props = { webRTCConnection: webRTC_connection | undefined }

export const Offerings = ({ webRTCConnection }: Props) => {

    const textAreaOffer = useRef<HTMLTextAreaElement>(null);
    const textAreaAnswer = useRef<HTMLTextAreaElement>(null);
 
    const [showOffer, setShowOffer] = useState<boolean>(false);
    const [answerProcessed, setAnswerProcessed] = useState<boolean>(false);
    const [offerIsLoading, setOfferIsLoading] = useState<boolean>(false);
    const [offer, setOffer] = useState<string>("")
    
    const createOffer = useCallback(async() => {
        console.info('create Offer...');   
        
        const offerCreated = await webRTCConnection?.createOffer(lastIceCandidate);
        if (!offerCreated) return;

        setShowOffer(false)
        setOfferIsLoading(true)
        console.info('Create Offer Done');
    }, [setShowOffer, setOfferIsLoading, webRTCConnection]);

    const lastIceCandidate = useCallback((peerConnection: RTCPeerConnection | null) => {
        console.info('Last Ice Candidate', peerConnection);

        const offer = peerConnection?.localDescription;
        if (!offer) return;
        setOffer(JSON.stringify(offer));

        setShowOffer(true);
        setOfferIsLoading(false);
        console.info("Offer Processed");
    }, [setOffer, setShowOffer, setOfferIsLoading])

    const clickAnswerPasted = useCallback(async() => {
        try {
            const answer = JSON.parse(textAreaAnswer.current!.value);
            const answerDone = await webRTCConnection!.handleAnswer(answer);
            setAnswerProcessed(answerDone);
            console.info('Answer Pasted');
        } catch (error) {
            console.error("failed to process:", error)
        }
    }, [webRTCConnection])

    return (
        <Box flexDirection="column" fontSize={12} justifyContent="center">
            <Button 
                {...buttonStyle}
                id="offering-create-offer-button" 
                onClick={createOffer}
                disabled={!showOffer}
            >Create Offer</Button>

            <Loader isLoading={offerIsLoading}/>

            <ShouldRender shouldRender={showOffer}>
                <Box id="offering-span-offer" flexDirection="column" padding={10}>
                    please copy the offer below and send it to a peer.
                    <TextArea 
                        {...textAreaStyle}
                        id="offering-textarea-offer" 
                        readOnly 
                        value={offer}
                        placeholder="please wait a few seconds" 
                        ref={textAreaOffer}
                    />

                    <Button 
                        {...buttonStyle}
                        id="offering-offer-copy-button" 
                        onClick={() => handleCopy(textAreaOffer.current?.value as string)} 
                    >copy offer</Button>

                    please wait for peer to give answer and paste it below

                    <TextArea 
                        {...textAreaStyle}
                        id="offering-answer-text-area" 
                        placeholder="please paste answer from peer"
                        ref={textAreaAnswer}/>
                    <Button 
                        {...buttonStyle}
                        id="offering-answer-pasted-button" 
                        onClick={clickAnswerPasted}
                        disabled={answerProcessed}
                    >answer pasted</Button>
                </Box>
            </ShouldRender>
        </Box>
    );
}
