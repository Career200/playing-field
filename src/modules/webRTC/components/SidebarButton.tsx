import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { T } from "../../components/Text";
import { sidebarButtonProps, textProps } from "./styles";

export type SidebarPages = "chat" | "user" | "offerings" | "answerings"

export const SidebarButton = ({height, text, refPage, page, setPage}: {height: number, text: string, refPage: SidebarPages,  page: SidebarPages, setPage: React.Dispatch<SidebarPages>}) => {

    return (
        <Box>
            <Button 
                zIndex={1}
                width={35}
                height={height}
                active={page === refPage} 
                mode="switch" 
                activeBg="silver"
                activeHoverBg="silver"
                hoverBg="silver"
                onClick={() => setPage(refPage)} 
                {...sidebarButtonProps}
            >
                <T {...textProps}>{text}</T>
            </Button>

            <Box 
                zIndex={page === refPage ? 10 : 2}
                position="relative"
                minWidth={5} 
                height={height}
                marginLeft={-6.25}
                background="silver"
                border="2px solid cadetblue"
                borderRight="none"
                borderLeft="none"
                />
        </Box>
    );
}