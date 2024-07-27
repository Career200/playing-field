import { RollingDice } from "../../../images/RollingDice";
import { Box } from "../Box";
import { useCallback, useState } from "react";
import { d4Img } from "../../../images/d4Img";

const d4img = d4Img();

export const D4 = (() => {
    const animationTime = 1;

    const [value, setValue] = useState<number>(0)
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsRolling(true);

        setTimeout(() => {
            setValue(Math.floor(4*Math.random()) + 1);  
            setIsRolling(false);
        }, animationTime*1000);
    }, [])
    
    const componentStyle: React.CSSProperties = { 
        clipPath: "polygon(0% 90%, 50% 10%, 100% 90%)"
    }

    return (
        <Box width={"100%"} alignItems="center" justifyContent="center" onClick={handleClick}>
            <RollingDice imgSrc={d4img} animationTime={animationTime} rotating={isRolling} diceStyle={componentStyle} onClick={handleClick}/>
            <Box position="fixed" display={isRolling ? "none" : "flex"} marginTop={55} marginLeft={0} >{value}</Box>
            <Box position="fixed" display={isRolling ? "none" : "flex"} marginTop={-2} marginLeft={20} >{value}</Box>
            <Box position="fixed" display={isRolling ? "none" : "flex"} marginTop={-2} marginLeft={-20} >{value}</Box>
        </Box>
        );
})