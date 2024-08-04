import { DraggableItem } from './DragableItem';
import { DragableItemProps, DragableStoreType } from '../types';
import { useStore } from './ZutandStore';

export const DragableContainer = () => {
  const items = useStore((state: DragableStoreType) => state.items)

  return (
    <>
      {items.map((item: DragableItemProps) => (
        <DraggableItem key={item.id} id={item.id} left={item.left} top={item.top} children={item.children} />
      ))}
    </>
  );
};
