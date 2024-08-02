import { DicePanel } from "./components/DicePanel";
import { DragableContainer } from "./components/DragableContainer";
import { useStore } from "./components/ZutandStore";
import { StoreType } from "./types";

export const TestPage = () => {
    const items = useStore((state: StoreType) => state.items);

    return (
        <>
            <DicePanel />
            <DragableContainer items={items}/>
        </>
    );
}
