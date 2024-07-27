import { RollingDice } from "../../../images/RollingDice";
import { Box } from "../Box";
import { useCallback, useState } from "react";
import { d20Img } from "../../../images/d20Img";

const d20img = d20Img();

export const D20 = (() => {
    const animationTime = 1;

    const [value, setValue] = useState<number>(0)
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsRolling(true);

        setTimeout(() => {
            setValue(Math.floor(20*Math.random()) + 1);  
            setIsRolling(false);
        }, animationTime*1000);
    }, [])
    
    const componentStyle: React.CSSProperties = { 
        clipPath: "polygon(50% 0%, 94% 28%, 94% 74%, 50% 100%, 6% 74%, 6% 28%)"
    }

    return (
        <Box width={"100%"} alignItems="center" justifyContent="center" onClick={handleClick}>
            <RollingDice imgSrc={d20img} animationTime={animationTime} rotating={isRolling} diceStyle={componentStyle} onClick={handleClick}/>
            <Box position="fixed" display={isRolling ? "none" : "flex"} marginTop={0} >{value}</Box>
        </Box>
        );
})