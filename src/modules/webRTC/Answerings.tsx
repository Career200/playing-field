import { useRef, useState } from "react";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { ShouldRender } from "../components/ShouldRender";
import { TextArea } from "../components/TextArea";
import { webRTC_connection } from "./utils/webRTC_class";
import { Loader } from "../components/Loader";

type Props = {
    webRTCConnection: webRTC_connection | undefined;
    remoteDescription?: string;
    setRemoteDescription?: React.Dispatch<React.SetStateAction<string>>;  
    localDescription?: string; 
    setLocalDescription?: React.Dispatch<React.SetStateAction<string>>;
}

export const Answerings = ({ webRTCConnection }: Props) => {

    const spanAnswer = useRef<HTMLDivElement>(null);
    const textAreaOffer = useRef<HTMLTextAreaElement>(null);
    const textAreaAnswer = useRef<HTMLTextAreaElement>(null);
    const buttonOfferPasted = useRef<HTMLButtonElement>(null);
    const buttonCompleted = useRef<HTMLButtonElement>(null);

    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [answerLoading, setAnswerLoading] = useState<boolean>(false);
    const [answerText, setAnswerText] = useState<string>("");

    const handleOffer = async() => {
        console.log('Hanle Offer Start');

        const offerObject = textAreaOffer.current?.value
        if (!offerObject) return;
        const offer = JSON.parse(offerObject);

        const offerHandleed = await webRTCConnection?.handleOffer(lastIceCandidate, offer);
        if (!offerHandleed) return;

        buttonOfferPasted.current!.disabled = true;
        textAreaOffer.current.readOnly = true;

        setShowAnswer(false);
        setAnswerLoading(true);
        console.info('Handle Offer Done');
    };

    const lastIceCandidate = (peerConnection: RTCPeerConnection | null) => {
        console.info('Last Ice Candidate', peerConnection);

        const answer = peerConnection?.localDescription
        setAnswerText(JSON.stringify(answer))
        console.info('Answer :', answer);

        setShowAnswer(true)
        setAnswerLoading(false)
        console.info("Offer Processed");
    };

    const clickCompleted = async () => {
        console.info('Completed', webRTCConnection?.dataChannel);
    };

    return (
        <Box flexDirection="column" justifyContent="center">
            answering to a connection offer from a peer
            please wait for peer to give offer and paste it below

            <TextArea id="textoffer" placeholder="please paste offer from peer" ref={textAreaOffer}/> 
            <Button id="buttonofferpasted" onClick={handleOffer} ref={buttonOfferPasted}>offer pasted</Button>

            <Loader isLoading={answerLoading}/>

            <ShouldRender shouldRender={showAnswer}>
                <Box id="spananswer" flexDirection="column" ref={spanAnswer}>
                    please send following answer to peer
                    <TextArea 
                        id="textanswer" 
                        readOnly 
                        value={answerText}
                        placeholder="please wait a few seconds" 
                        ref={textAreaAnswer}/>

                        <Button 
                            id="buttonanswerpasted" 
                            onClick={clickCompleted}
                            ref={buttonCompleted}
                        >completed</Button>
                </Box>

            </ShouldRender>  
        </Box>
    );
}
