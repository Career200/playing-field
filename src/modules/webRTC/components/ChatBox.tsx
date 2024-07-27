import { useCallback, useRef } from "react";
import { Box } from "../../components/Box";
import { webRTC_connection } from "../baseWebRTC";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { dataChannelMessage } from "../utils/dataChannelMessage";
import { ShouldRender } from "../../components/ShouldRender";
import { buttonStyle, chatBoxStyle } from "./styles";

type Props = { 
    webRTCConnection: webRTC_connection | undefined, 
    page: string,
};

export const ChatBox = ({ webRTCConnection, page }: Props) => {
    const chatInputRef = useRef<HTMLInputElement>(null);
    
    const chatButtonClick = useCallback(() => {
        console.info('Chat Button Click');
        const userName = document.getElementById("user-name")?.innerHTML as string;
        const text = chatInputRef.current?.value
        if (!text) return;

        try {
            webRTCConnection!.dataChannel!.send(JSON.stringify({ text, userName }));
            dataChannelMessage({ data: JSON.stringify({ text }) } as MessageEvent);
        } catch (error) {
            dataChannelMessage({ data: JSON.stringify({ text: text + "(is not sent)" }) } as MessageEvent)
        };
        
        chatInputRef.current.value = '';
    }, [webRTCConnection, dataChannelMessage]);

    return (
        <Box flexDirection="column" justifyContent="center" minHeight={100} height="100%" width={"100%"} gap={10}>
            <Box 
                {...chatBoxStyle}
                id="chat-log" 
            />
            <ShouldRender shouldRender={page === "chat"}>
                <Input id="chat-input" type="text"  placeholder="type here" ref={chatInputRef}/>
                <Button 
                    {...buttonStyle}
                    id="send-chat-button" 
                    onClick={chatButtonClick} 
                >send</Button>
            </ShouldRender>
        </Box>
    )
}

