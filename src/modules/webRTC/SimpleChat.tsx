import React, { useEffect, useState } from "react";
import { Box } from "../components/Box";
import { ShouldRender } from "../components/ShouldRender";
import { Answerings } from "./Answerings";
import { ChatBox } from "./ChatBox";
import { Offerings } from "./Offerrings";
import { webRTC_connection } from "./utils/webRTC_class";
import { Button } from "../components/Button";
import { T } from "../components/Text";
import { ChatUserPage, UserInfo } from "./ChatUserPage";

const sidebarButtonProps: React.CSSProperties = {
    justifyContent: "center",
    border: "2px solid cadetblue",
    outline: "1px solid mediumslateblue",
    background: "lavender ",
    color: "indianred ",
    alignItems: "center",
    borderRadius: 10,
} 

const textProps: React.CSSProperties = {
    justifyContent: "center",
    alignItems: "center",   
    color: "inherit",
    transform: "rotate(-90deg)",
    fontSize: 14,
    fontFamily: "sans-serif"
} 

export const WebRTCChat = () => {
    const [page, setPage] = useState<string>("user");
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: "John Doe" });
    const [actualPeerConnection, setActualPeerConnection] = useState<webRTC_connection>();
    
    useEffect(() => {
        const newPeerConnection = new webRTC_connection();
        setActualPeerConnection(newPeerConnection);
    }, [])

    return (
        <Box
            flexDirection="row"
            width={330}
            height="100%"
            minHeight={600}
            gap={12}
        >
            <Box width={30} flexDirection="column" gap={10} paddingTop={10}>
                <Button active={page === "user"} mode="switch" onClick={() => setPage("user")} {...sidebarButtonProps} >
                    <T height={60} {...textProps}>User Page</T>
                </Button>
                <Button active={page === "chat"} mode="switch" onClick={() => setPage("chat")} {...sidebarButtonProps} >
                    <T height={30} {...textProps}>Chat</T>
                </Button>
                <Button active={page === "offerings"} mode="switch"  onClick={() => setPage("offerings")} {...sidebarButtonProps} >
                    <T height={60} {...textProps}>Offering</T>
                </Button>
                <Button active={page === "answerings"} mode="switch"  onClick={() => setPage("answerings")} {...sidebarButtonProps} >
                    <T height={60} {...textProps}>Answering</T>
                </Button>
            </Box>
            
            <Box 
                padding={10}
                gap={10}
                flexDirection="column"
                width="100%"
                background="silver"
                border = "2px solid cadetblue"
                outline = "1px solid mediumslateblue"
                borderRadius={10}
            >
                <Box id="userName">{userInfo.name}</Box>
                <ShouldRender shouldRender={page === "user"}>
                    <ChatUserPage userInfo={userInfo} setUserInfo={setUserInfo} />
                </ShouldRender>

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