import { DraggableItem } from './DragableItem';
import { DragableContainerProps, DragableItemProps, StoreType } from '../types';
import { useStore } from './ZutandStore';

export const DragableContainer = ({ } : DragableContainerProps) => {
const items = useStore((state: StoreType) => state.items)

  return (
    <>
      {items.map((item: DragableItemProps) => (
        <DraggableItem key={item.id} id={item.id} left={item.left} top={item.top} children={item.children} />
      ))}
    </>
  );
};
