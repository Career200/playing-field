import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { T } from "../components/Text";

export type SidebarPages = "chat" | "user" | "offerings" | "answerings"

const sidebarButtonProps: React.CSSProperties = {
    justifyContent: "center",
    border: "2px solid cadetblue",
    outline: "1px solid mediumslateblue",
    borderRight: "none",
    background: "lavender",
    color: "indianred ",
    alignItems: "center",
    borderRadius: "10px 0px 0px 10px",
};

const textProps: React.CSSProperties = {
    justifyContent: "center",
    alignItems: "center",   
    color: "inherit",
    transform: "rotate(-90deg)",
    fontSize: 12,
    fontFamily: "sans-serif",
    whiteSpace: "nowrap",
    
};

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
                background={"silver"}
                border="2px solid cadetblue"
                borderRight="none"
                borderLeft="none"
                />
        </Box>
    );
}