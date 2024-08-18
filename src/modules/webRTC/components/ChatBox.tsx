import { useCallback, useRef } from "react";
import { Box } from "../../components/Box";
import { webRTC_connection } from "../baseWebRTC";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { dataChannelMessage } from "../utils/dataChannelMessage";
import { ShouldRender } from "../../components/ShouldRender";
import { buttonStyle, chatBoxStyle } from "./styles";

type Props = {
  webRTCConnection: webRTC_connection[] | undefined;
  page: string;
};

export const ChatBox = ({ webRTCConnection, page }: Props) => {
  const chatInputRef = useRef<HTMLInputElement>(null);

  const chatButtonClick = useCallback(() => {
    console.info("Chat Button Click");
    const errArray: unknown[] = [];
    const userName = document.getElementById("user-name")?.innerHTML as string;
    const text = chatInputRef.current?.value;
    if (!text) return;

    if (!Array.isArray(webRTCConnection)) {
      dataChannelMessage({
        data: JSON.stringify({ text: text + "(is not sent)" }),
      } as MessageEvent);
      chatInputRef.current.value = "";
      return;
    }

    for (let connection of webRTCConnection) {
      try {
        console.log("send message to ", connection);
        connection.dataChannel!.send(JSON.stringify({ text, userName }));
      } catch (error) {
        errArray.push(error);
      }
    }

    if (errArray.length > 0) {
      if (errArray.length === webRTCConnection.length) {
        dataChannelMessage({
          data: JSON.stringify({ text: text + "(is not sent)" }),
        } as MessageEvent);
      } else {
        dataChannelMessage({
          data: JSON.stringify({ text: text + "(partly not sent)" }),
        } as MessageEvent);
      }
    } else {
      dataChannelMessage({ data: JSON.stringify({ text }) } as MessageEvent);
    }

    chatInputRef.current.value = "";
  }, [webRTCConnection, dataChannelMessage]);

  console.log(webRTCConnection?.length);

  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      minHeight={100}
      height="100%"
      width={"100%"}
      gap={10}
    >
      <Box {...chatBoxStyle} id="chat-log" />
      <ShouldRender shouldRender={page === "chat"}>
        <Input
          id="chat-input"
          type="text"
          placeholder="type here"
          ref={chatInputRef}
        />
        <Button
          {...buttonStyle}
          id="send-chat-button"
          onClick={chatButtonClick}
        >
          send
        </Button>
      </ShouldRender>
    </Box>
  );
};
