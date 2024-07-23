import { useRef } from "react";
import { Box } from "../components/Box";
import { webRTC_connection } from "./utils/webRTC_class";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { dataChannelMessage } from "./utils/dataChannelMessage";

export const ChatBox = ({ webRTCConnection }: { webRTCConnection: webRTC_connection | undefined }) => {

    const chatLogRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const chatButtonRef = useRef<HTMLButtonElement>(null);
    
    const chatbuttonclick = () => {
        console.info('Chat Button Click');
        const userName = document.getElementById("userName")?.innerHTML as string;
        const text = chatInputRef.current?.value
        if (!text) return;

        try {
            webRTCConnection!.dataChannel!.send(JSON.stringify({ text, userName }));
            dataChannelMessage({ data: JSON.stringify({ text }) } as MessageEvent);
        } catch (error) {
            dataChannelMessage({ data: JSON.stringify({ text: text + "(is not sent)" }) } as MessageEvent)
        };
        
        chatInputRef.current.value = '';
      }

    return (
        <Box flexDirection="column" justifyContent="center" minHeight={200} height="100%" width={"100%"} gap={10}>
            <Box 
                id="chatlog" 
                ref={chatLogRef} 
                height="100%" 
                width="100%"
                border="2px solid lightslategray" 
                background="honeydew"
                borderRadius={10}
                overflow="scroll"
                flexDirection="column"
                color="darkblue"
                fontSize={12}
                alignItems="center"
            />
            <Input id="chatinput" type="text"  placeholder="type here" ref={chatInputRef} />
            <Button id="chatbutton" onClick={chatbuttonclick} ref={chatButtonRef}>send</Button>
        </Box>
    )
}

