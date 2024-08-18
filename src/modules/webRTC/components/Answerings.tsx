import { useCallback, useRef, useState } from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { ShouldRender } from "../../components/ShouldRender";
import { TextArea } from "../../components/TextArea";
import { webRTC_connection } from "../baseWebRTC";
import { Loader } from "../../components/Loader";
import { handleCopy } from "../utils/handleCopy";
import { buttonStyle, textAreaStyle } from "./styles";

type Props = { webRTCConnection: webRTC_connection | undefined };

export const Answerings = ({ webRTCConnection }: Props) => {
  const textAreaOffer = useRef<HTMLTextAreaElement>(null);
  const textAreaAnswer = useRef<HTMLTextAreaElement>(null);

  const [showAnswer, setShowAnswer] = useState<boolean>(true);
  const [answerLoading, setAnswerLoading] = useState<boolean>(false);
  const [answerText, setAnswerText] = useState<string>("");

  const handleOffer = useCallback(async () => {
    console.info("Hanle Offer Start");
    try {
      const offerObject = textAreaOffer.current?.value;
      if (!offerObject) return;

      const offer = JSON.parse(offerObject);
      await webRTCConnection!.handleOffer(lastIceCandidate, offer);
      setShowAnswer(false);
      setAnswerLoading(true);
      console.info("Handle Offer Done");
    } catch (error) {
      console.error("faild to handle offer:", error);
    }
  }, [webRTCConnection, setAnswerLoading, setShowAnswer]);

  const lastIceCandidate = useCallback(
    (peerConnection: RTCPeerConnection | null) => {
      console.info("Last Ice Candidate");

      const answer = peerConnection?.localDescription;
      setAnswerText(JSON.stringify(answer));

      setShowAnswer(true);
      setAnswerLoading(false);
      console.info("Offer Processed");
    },
    [],
  );

  const clickCompleted = useCallback(async () => {
    handleCopy(textAreaAnswer.current?.value as string);
    console.info("Completed", webRTCConnection?.dataChannel);
  }, [handleCopy]);

  return (
    <Box
      flexDirection="column"
      fontSize={12}
      justifyContent="center"
      background={"silver"}
      minWidth={300}
      minHeight={300}
    >
      answering to a connection offer from a peer please wait for peer to give
      offer and paste it below
      <TextArea
        {...textAreaStyle}
        id="answering-textarea-offer"
        readOnly={answerLoading || !showAnswer}
        placeholder="please paste offer from peer"
        ref={textAreaOffer}
      />
      <Button
        {...buttonStyle}
        id="answering-offer-pasted-button"
        onClick={handleOffer}
        disabled={answerLoading || !showAnswer}
      >
        offer pasted
      </Button>
      <Loader isLoading={answerLoading} />
      <ShouldRender shouldRender={showAnswer}>
        <Box id="answering-spanan-aswer" flexDirection="column">
          please send following answer to peer
          <TextArea
            {...textAreaStyle}
            id="answering-textarea-answer"
            readOnly
            value={answerText}
            placeholder="please wait a few seconds"
            ref={textAreaAnswer}
          />
          <Button
            {...buttonStyle}
            id="answering-answer-pasted-button"
            onClick={clickCompleted}
          >
            copy answer
          </Button>
        </Box>
      </ShouldRender>
    </Box>
  );
};
