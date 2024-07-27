import { RollingDice } from "../../../images/RollingDice";
import { Box } from "../Box";
import { useCallback, useState } from "react";
import { d12Img } from "../../../images/d12Img";

const d12img = d12Img();

export const D12 = (() => {
    const animationTime = 1;

    const [value, setValue] = useState<number>(0)
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsRolling(true);

        setTimeout(() => {
            setValue(Math.floor(12*Math.random()) + 1);  
            setIsRolling(false);
        }, animationTime*1000);
    }, [])
    
    const componentStyle: React.CSSProperties = { 
        clipPath: "polygon(0% 35%, 20% 10%, 50% 0%, 80% 10%, 100% 35%, 100% 65%, 80% 90%, 50% 100%, 20% 90%, 0% 65%)"
    }

    return (
        <Box width={"100%"} alignItems="center" justifyContent="center" onClick={handleClick}>
            <RollingDice imgSrc={d12img} animationTime={animationTime} rotating={isRolling} diceStyle={componentStyle} onClick={handleClick}/>
            <Box position="fixed" display={isRolling ? "none" : "flex"} marginTop={-2} >{value}</Box>
        </Box>
        );
})