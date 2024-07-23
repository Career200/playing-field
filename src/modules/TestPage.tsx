import { useState } from "react";
import { DragableContainer } from "./components/DragableContainer";
import { DragableItemProps } from "./types";
import { D20 } from "./components/Dice/D20";
import { WebRTCChat } from "./webRTC/SimpleChat";
import { Box } from "./components/Box";

export const TestPage = () => {

    const [items, setItems] = useState<DragableItemProps[]>([
        { id: 1, left: 200, top: 200, children: <D20/> },
        { id: 2, left: 300, top: 300, children: <D20/> },
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
