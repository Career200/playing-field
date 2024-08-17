import { useCallback } from "react";
import { DiceStoreType, DiceType, DragableStoreType } from "../types";
import { Button } from "./Button";
import { Box } from "./Box";
import { useDice, useStore } from './ZutandStore';
import { T } from "./Text";
import { Dice } from "./Dice.tsx";

const buttonStyle: React.CSSProperties = {
    background: "lightblue",
    border: "1px solid red"
}

export const DicePanel = () => {
    // dragable state
    const addNewItem = useStore((state: DragableStoreType) => state.addNewItem);
    const removeItems = useStore((state: DragableStoreType) => state.removeItems);
    const items = useStore((state: DragableStoreType) => state.items);
    // dices state
    const addNewDice = useDice((state: DiceStoreType) => state.addNewDice);
    const removeDices = useDice((state: DiceStoreType) => state.removeDices);
    const dices = useDice((state: DiceStoreType) => state.dices);

    const windowSize = [window.innerWidth, window.innerHeight]

    const handleAddNew = useCallback((type: DiceType["type"]) => {
        const newId = items.length ? +items[items.length-1].id + 1 : 1;
        const newDiceId = dices.length ? +items[items.length-1].id + 1 : 1;

        addNewItem({ 
            id: newId, 
            left: (50 - Math.floor(100*Math.random())) + 100, 
            top: (50 - Math.floor(100*Math.random())) + windowSize[1] - 200, 
            children: <Dice id={newId} type={type}/>
        });

        addNewDice({ 
            id: newDiceId, 
            value: 0,
            type,
        });

    }, [items, dices]);

    const handleRemoveAll = useCallback(() => {
       removeItems();
       removeDices();
    }, []);

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
                    <Button {...buttonStyle} onClick={() => handleAddNew(20)}>d20</Button>
                    <Button {...buttonStyle} onClick={() => handleAddNew(12)}>d12</Button>
                    <Button {...buttonStyle} onClick={() => handleAddNew(10)}>d10</Button>
                    <Button {...buttonStyle} onClick={() => handleAddNew(8)}>d8</Button>
                    <Button {...buttonStyle} onClick={() => handleAddNew(6)}>d6</Button>
                    <Button {...buttonStyle} onClick={() => handleAddNew(4)}>d4</Button>
                </Box>
            </Box>
            <Button {...buttonStyle} onClick={() => handleRemoveAll()}>remove all</Button>
        </Box>
    )
}