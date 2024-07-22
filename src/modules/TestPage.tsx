import { useState } from "react";
import { DragableContainer } from "./components/DragableContainer";
import { DragableItemProps } from "./types";
import { D20 } from "./components/Dice/D20";

export const TestPage = () => {

    const [items, setItems] = useState<DragableItemProps[]>([
        { id: 1, left: 200, top: 200, children: <D20/> },
        { id: 2, left: 300, top: 300, children: <D20/> },
      ]);

    return (
        <DragableContainer items={items} setItems={setItems}/>
    );
}
