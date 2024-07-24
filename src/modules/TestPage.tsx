import { useState } from "react";
import { DragableContainer } from "./components/DragableContainer";
import { DragableItemProps } from "./types";
import { D20 } from "./components/Dice/D20";
import { WebRTCChat } from "./webRTC/SimpleChat";
import { Box } from "./components/Box";
import { D12 } from "./components/Dice/D12";
import { D10 } from "./components/Dice/D10";
import { D8 } from "./components/Dice/D8";
import { D6 } from "./components/Dice/D6";
import { D4 } from "./components/Dice/D4";

export const TestPage = () => {

    const windowSize = [window.innerWidth, window.innerHeight]

    const [items, setItems] = useState<DragableItemProps[]>([
        { id: 1, left: 100, top: windowSize[1] - 200, children: <D20/> },
        { id: 2, left: 200, top: windowSize[1] - 200, children: <D12/> },
        { id: 3, left: 300, top: windowSize[1] - 200, children: <D10/> },
        { id: 4, left: 400, top: windowSize[1] - 200, children: <D8/> },
        { id: 5, left: 500, top: windowSize[1] - 200, children: <D6/> },
        { id: 6, left: 600, top: windowSize[1] - 200, children: <D4/> },
      ]);

    return (
        <>
            <DragableContainer items={items} setItems={setItems}/>
            <Box position="fixed" width={330} height="100%" top={0} right={0}>
                <WebRTCChat />
            </Box>
        </>
    );
}
