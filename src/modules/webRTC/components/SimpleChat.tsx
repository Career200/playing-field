import { useEffect, useState } from "react";
import { Box } from "../../components/Box";
import { ShouldRender } from "../../components/ShouldRender";
import { Answerings } from "./Answerings";
import { ChatBox } from "./ChatBox";
import { Offerings } from "./Offerrings";
import { webRTC_connection } from "../baseWebRTC";
import { ChatUserPage, UserInfo } from "./ChatUserPage";
import { SidebarButton, SidebarPages } from "./SidebarButton";

export const WebRTCChat = () => {
    const [page, setPage] = useState<SidebarPages>("user");
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: "John Doe" });
    const [actualPeerConnection, setActualPeerConnection] = useState<webRTC_connection>();
    
    useEffect(() => {
        const newPeerConnection = new webRTC_connection();
        setActualPeerConnection(newPeerConnection);
    }, [])

    return (
        <Box
            position="fixed" 
            top={0} 
            right={0}
            flexDirection="row"
            width={330}
            height="100%"
            minHeight={400}
            gap={12}
        >
            <Box width={30} flexDirection="column" gap={10} marginRight={-5} paddingTop={10}>  
                <SidebarButton refPage="user" text="User Page" height={100} page={page} setPage={setPage} />
                <SidebarButton refPage="chat" text="Chat" height={60} page={page} setPage={setPage} />
                <SidebarButton refPage="offerings" text="Offering" height={80} page={page} setPage={setPage} />
                <SidebarButton refPage="answerings" text="Answering" height={80} page={page} setPage={setPage} />
            </Box>
            
            <Box 
                padding={2}
                width="100%"
                background="silver"
                border = "2px solid cadetblue"
                outline = "1px solid mediumslateblue"
                borderRadius={10}
                zIndex={5}
            >
                <Box 
                    border="1px solid grey"
                    borderRadius={10}
                    boxShadow="inset 0px 0px 5px 5px grey"
                    background="silver"              
                    width="100%"
                    padding={8}
                    gap={10}
                    flexDirection="column">

                    <Box justifyContent="center" id="user-name">{userInfo.name}</Box>
                    <ShouldRender shouldRender={page === "user"}>
                        <ChatUserPage userInfo={userInfo} setUserInfo={setUserInfo} />
                    </ShouldRender>

                    <ShouldRender shouldRender={page === "offerings"}>
                        <Offerings webRTCConnection={actualPeerConnection} />
                    </ShouldRender>

                    <ShouldRender shouldRender={page === "answerings"}>
                        <Answerings webRTCConnection={actualPeerConnection} />
                    </ShouldRender> 

                    <ChatBox webRTCConnection={actualPeerConnection} page={page}/>
                </Box>
            </Box>
        </Box>
    );
};