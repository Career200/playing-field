import { useCallback, useEffect, useState } from "react";
import { Box } from "../../components/Box";
import { ShouldRender } from "../../components/ShouldRender";
import { Answerings } from "./Answerings";
import { ChatBox } from "./ChatBox";
import { Offerings } from "./Offerrings";
import { webRTC_connection } from "../baseWebRTC";
import { ChatUserPage, UserInfo } from "./ChatUserPage";
import { SidebarButton, SidebarPages } from "./SidebarButton";
import { ModalWindow } from "../../components/ModalWindow";
import { ChannelButton } from "./ChannelButton";
import { chatTheme } from "./styles";

export const WebRTCChat = () => {
    const [page, setPage] = useState<SidebarPages>("chat");
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: "John Doe" });
    const [actualPeerConnection, setActualPeerConnection] = useState<webRTC_connection>();
    const [peerConnections, setPeerConnections] = useState<webRTC_connection[]>([]);
    const [selectedConnections, setSelectedConnections] = useState<webRTC_connection[]>([]);
    const [pressedButtons, setPressedButtons] = useState<boolean[]>([true]);

    useEffect(() => {
        if (pressedButtons[0]) {
            setSelectedConnections(peerConnections);
            return;
        }
        const mappedConnections: webRTC_connection[] = []; 
        pressedButtons.forEach((checked, index) => {
            checked && mappedConnections.push(peerConnections[index - 1]);
        });

        setSelectedConnections(mappedConnections)
    }, [pressedButtons, peerConnections])

    const addNewConnection = useCallback(() => {
        const newPeerConnection = new webRTC_connection();
        setActualPeerConnection(newPeerConnection);
        setPeerConnections([...peerConnections, newPeerConnection]);
        setPressedButtons([...pressedButtons, true])
    }, [setPeerConnections, setActualPeerConnection, peerConnections]);

    const newOfferClick = useCallback(() => {
        addNewConnection();
        setPage("offerings");
    }, [addNewConnection, setPage]);

    const newAnswerClick = useCallback(() => {
        addNewConnection();
        setPage("answerings");
    }, [addNewConnection, setPage]);

    const channelButtonClick = useCallback((index: number) => {
        const newButtonsArray = [...pressedButtons];
        newButtonsArray[index] = !pressedButtons[index];
        setPressedButtons(newButtonsArray);
    }, [pressedButtons, setPressedButtons])

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
            id="chat-root"         
        >
            <Box
                id="channel-selection-container"
                width={30}
                padding={2}
                flexDirection="column"
            >
                <ChannelButton key={"C-0"} active={pressedButtons[0]} text="All" onClick={() => channelButtonClick(0)}/>
                {peerConnections.map((_, i) => {
                    const index = i + 1;
                    return <ChannelButton key={"C-" + index} active={pressedButtons[index]} onClick={() => channelButtonClick(index)} text={"C-" + i}/>;
                })}
            </Box>
            <Box 
                padding={2}
                width="100%"
                height="100%"
                flexDirection="column"
                border={`2px solid ${chatTheme.colors.border.main}`}
                borderRadius={10}
            >
                <Box height={30} width="100%" flexDirection="row" gap={10}>  
                    <SidebarButton refPage="user" text="User" width="100%" page={page} onClick={() => setPage("user")} />
                    <SidebarButton refPage="chat" text="Chat" width="100%" page={page} onClick={() => setPage("chat")} />
                </Box>   
                 
                <Box height={30} width="100%" flexDirection="row" gap={10}> 
                    <SidebarButton refPage="offerings" page={page} width="100%" onClick={newOfferClick} text={"Offer"} />
                    <SidebarButton refPage="answerings" page={page} width="100%" onClick={newAnswerClick} text={"Answer"} />
                </Box>

                <Box justifyContent="center" id="user-name">{userInfo.name}</Box>

                    <ShouldRender shouldRender={page === "user"}>
                        <ChatUserPage userInfo={userInfo} setUserInfo={setUserInfo} />
                    </ShouldRender>

                <ChatBox webRTCConnection={selectedConnections} page={page}/>

                <ModalWindow isOpen={page === "offerings"} onClose={() => setPage("chat")}>
                   <Offerings webRTCConnection={actualPeerConnection} />
                </ModalWindow>

                <ModalWindow isOpen={page === "answerings"} onClose={() => setPage("chat")}>
                   <Answerings webRTCConnection={actualPeerConnection} />
                </ModalWindow>
            </Box>
        </Box>
    );
};