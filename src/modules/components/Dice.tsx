import { RollingDice } from "@images/RollingDice";
import { Box } from "./Box";
import { useCallback, useEffect, useRef, useState } from "react";
import { d10Img, d12Img, d20Img, d4Img, d6Img, d8Img } from "@images/index";
import { useDice } from "./ZutandStore";
import { DiceStoreType, DiceType } from "../types";

const diceMap: { [key in DiceType["type"]]: [string, string, number, number] } = {
    4: d4Img(),
    6: d6Img(),
    8: d8Img(),
    10: d10Img(),
    12: d12Img(),
    20: d20Img(),
    100: d10Img(),
}

export const Dice = (({ id, type }: DiceType) => {
    const animationTime = 1;

    const rollDice = useDice((state: DiceStoreType) => state.rollDice);
    const dices = useDice((state: DiceStoreType) => state.dices);
    const [value, setValue] = useState<number>();
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const diceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const val = dices.find((dice) => dice.id === id)?.value;
        if(!val) return;

        setValue(Math.floor(val*type) + 1);
    }, [dices])

    const handleClick = useCallback(() => {
        setIsRolling(true);
        setTimeout(() => { 
            setIsRolling(false);
            rollDice({id});
        }, animationTime*1000);
    }, [])
    
    const componentStyle: React.CSSProperties = { 
        clipPath: diceMap[type][1]
    }

    return (
        <Box width={"100%"} alignItems="center" justifyContent="center" onClick={handleClick} ref={diceRef}>
            <RollingDice imgSrc={diceMap[type][0]} animationTime={animationTime} rotating={isRolling} diceStyle={componentStyle} onClick={handleClick}/>
            <Box 
                position="fixed" 
                marginTop={diceMap[type][2]}
                borderRadius={10}
                justifyContent="center"
                alignItems="center"
                fontSize={diceMap[type][3]}
                display={isRolling ? "none" : "flex"}
            >{value}</Box>
        </Box>
        );
})