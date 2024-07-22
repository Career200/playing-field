import { useRef } from "react";
import { Box } from "../components/Box";
import { webRTC_connection } from "./utils/webRTC_class";
import { chatlog } from "./utils/chatlog";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export const ChatBox = ({ webRTCConnection }: { webRTCConnection: webRTC_connection | undefined }) => {

    const chatLogRef = useRef<HTMLDivElement>(null);
    const chatInputRef = useRef<HTMLInputElement>(null);
    const chatButtonRef = useRef<HTMLButtonElement>(null);
    
    const chatbuttonclick = () => {
        console.log('chatbuttonclick');
        const text = chatInputRef.current?.value

        if (!text) return;

        console.log(webRTCConnection?.peerConnection, webRTCConnection?.dataChannel)

        try {
            webRTCConnection!.dataChannel!.send(text);
            chatlog(text);
        } catch (error) {
            chatlog(text + "(is not sent)");
        };
        
        chatInputRef.current.value = '';
      }

    return (
        <Box flexDirection="column" padding={2} justifyContent="center" height="100%" width={"100%"}>
            <Box 
                id="chatlog" 
                ref={chatLogRef} 
                height="100%" 
                width="100%"
                border="2px solid red" 
                overflow="scroll"
                flexDirection="column"
                fontSize={12}
                gap={2}
            />
            <Input id="chatinput" type="text"  placeholder="type here" ref={chatInputRef} />
            <Button id="chatbutton" onClick={chatbuttonclick} ref={chatButtonRef}>send</Button>
        </Box>
    )
}

