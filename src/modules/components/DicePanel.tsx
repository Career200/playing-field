import { useCallback } from "react";
import { StoreType } from "../types";
import { D4, D6, D8, D10, D12, D20 } from "./Dice";
import { Button } from "./Button";
import { Box } from "./Box";
import { useStore } from './ZutandStore';
import { T } from "./Text";

const buttonStyle: React.CSSProperties = {
    background: "lightblue",
    border: "1px solid red"
}

export const DicePanel = () => {
    const addNewItem = useStore((state: StoreType) => state.addNewItem);
    const removeItems = useStore((state: StoreType) => state.removeItems);
    const items = useStore((state: StoreType) => state.items);

    const windowSize = [window.innerWidth, window.innerHeight]

    const addNewDice = useCallback((Dice: JSX.Element) => {

        addNewItem({ id: items.length ? +items[items.length-1].id + 1 : 1, left: 100, top: windowSize[1] - 200, children: Dice })

    }, [items])
    return (
        <Box 
            position="fixed" 
            padding={4} 
            border="1px solid red" 
            borderRadius={10} 
            top={0} 
            left="50%" 
            transform="translate(-50%, 0)"
            gap={4}
        >
            <Box flexDirection="column">
                <T width="100%" justifyContent="center">Add new</T>
                <Box gap={4}>
                    <Button {...buttonStyle} onClick={() => addNewDice(<D20/>)}>d20</Button>
                    <Button {...buttonStyle} onClick={() => addNewDice(<D12/>)}>d12</Button>
                    <Button {...buttonStyle} onClick={() => addNewDice(<D10/>)}>d10</Button>
                    <Button {...buttonStyle} onClick={() => addNewDice(<D8/>)}>d8</Button>
                    <Button {...buttonStyle} onClick={() => addNewDice(<D6/>)}>d6</Button>
                    <Button {...buttonStyle} onClick={() => addNewDice(<D4/>)}>d4</Button>
                </Box>
            </Box>
            <Button {...buttonStyle} onClick={() => removeItems()}>remove all</Button>
        </Box>
    )
}