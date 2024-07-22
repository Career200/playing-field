import { RollingDice } from "./RollingDice";
import d20_blank from "../../../images/d20_blank.svg"
import { Box } from "../Box";
import { useCallback, useState } from "react";

export const D20 = (() => {

    const [value, setValue] = useState<number>(0)
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsRolling(true);

        setTimeout(() => {
            setValue(Math.floor(20*Math.random()) + 1);  
            setIsRolling(false);
        }, 2000);
    }, [])
    
    const componentStyle: React.CSSProperties = { 
        clipPath: "polygon(50% 0%, 93% 27.5%, 93% 73%, 50% 100.5%, 7.5% 73%, 7.5% 27.5%)"
    }

    return (
        <Box width={"100%"} alignItems="center" justifyContent="center" onClick={handleClick}>
            <RollingDice imgSrc={d20_blank} rotating={isRolling} diceStyle={componentStyle} onClick={handleClick}/>
            <Box position="fixed" display={isRolling ? "none" : "flex"} top={"42.5%"}>{value}</Box>
        </Box>
        );
})