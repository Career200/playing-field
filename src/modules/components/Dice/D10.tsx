import { RollingDice } from "../../../images/RollingDice";
import { Box } from "../Box";
import { useCallback, useState } from "react";
import { d10Img } from "../../../images/d10Img";

const d10img = d10Img();

export const D10 = (() => {
    const animationTime = 1;

    const [value, setValue] = useState<number>(0)
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsRolling(true);

        setTimeout(() => {
            setValue(Math.floor(10*Math.random()) + 1);  
            setIsRolling(false);
        }, animationTime*1000);
    }, [])
    
    const componentStyle: React.CSSProperties = { 
        clipPath: "polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%)"
    }

    return (
        <Box width={"100%"} alignItems="center" justifyContent="center" onClick={handleClick}>
            <RollingDice imgSrc={d10img} animationTime={animationTime} rotating={isRolling} diceStyle={componentStyle} onClick={handleClick}/>
            <Box position="fixed" display={isRolling ? "none" : "flex"} marginTop={-10} >{value}</Box>
        </Box>
        );
})