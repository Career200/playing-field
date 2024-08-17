import { useCallback, useRef } from "react";
import { Box } from "../../components/Box";
import { Input } from "../../components/Input";
import { T } from "../../components/Text";

export type UserInfo = {
    name: string,
    //... other user info
}

export const ChatUserPage = ({ userInfo, setUserInfo }: { userInfo: UserInfo, setUserInfo: React.Dispatch<UserInfo> }) => {

    const chatUserInputRef = useRef<HTMLInputElement>(null);

    const getUserData = useCallback((): UserInfo => {
        const name = chatUserInputRef.current?.value || "";

        return { name }
    }, [])

    const submitUserData = useCallback(() => {
        setUserInfo(getUserData());
        console.info('Info updated !');
    }, [getUserData, setUserInfo])

    return (
        <Box flexDirection="column" justifyContent="center" width={"100%"} gap={10}>
            <Box flexDirection="column" width="100%">
                <T justifyContent="center">Your User Name</T>
                <Input id="user-name-display" type="text" onChange={submitUserData} value={userInfo.name} placeholder="type here" ref={chatUserInputRef} />
            </Box>
        </Box>
    )
}

