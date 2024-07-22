import React, { useEffect, useState } from "react";
import { Box } from "../components/Box";
import { ShouldRender } from "../components/ShouldRender";
import { Answerings } from "./Answerings";
import { ChatBox } from "./ChatBox";
import { Offerings } from "./Offerrings";
import { webRTC_connection } from "./utils/webRTC_class";
import { Button } from "../components/Button";

const sidebarButtonProps: React.CSSProperties = {
    justifyContent: "center",
    border: "1px solid red",
    color: "darkgoldenrod",
    alignItems: "center",
    borderRadius: 10,
} 

export const WebRTCChat = () => {
    const [page, setPage] = useState<string>("chat");
    const [actualPeerConnection, setActualPeerConnection] = useState<webRTC_connection>();
    
    useEffect(() => {
        const newPeerConnection = new webRTC_connection();
        setActualPeerConnection(newPeerConnection);
    }, [])

    return (
        <Box
            position="fixed"
            width={330}
            height="100%"
            top={0} 
            right={0}
            gap={10}
        >
            <Box width={30} flexDirection="column" gap={10} paddingTop={10}>
                <Button onClick={() => setPage("chat")} {...sidebarButtonProps} >C</Button>
                <Button onClick={() => setPage("offerings")} {...sidebarButtonProps} >O</Button>
                <Button onClick={() => setPage("answerings")} {...sidebarButtonProps} >A</Button>
            </Box>
            
            <Box 
                padding={10}
                gap={10}
                flexDirection="column"
                width="100%"
                background="silver"
                border="4px solid"
            >
                <ShouldRender shouldRender={page === "offerings"}>
                    <Offerings webRTCConnection={actualPeerConnection} />
                </ShouldRender>

                <ShouldRender shouldRender={page === "answerings"}>
                    <Answerings webRTCConnection={actualPeerConnection} />
                </ShouldRender> 

                <ChatBox webRTCConnection={actualPeerConnection} />
            </Box>
        </Box>
    );
};