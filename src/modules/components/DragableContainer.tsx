import { DraggableItem } from './DragableItem';
import { DragableContainerProps, DragableItemProps } from '../types';

export const DragableContainer = ({ items, setItems } : DragableContainerProps) => {

  const moveItem = ({id, left = 0, top = 0}: Partial<DragableItemProps>) => {
    setItems((prevItems) =>
    {
      return prevItems.map((item) =>
        item.id === id ? { ...item, left, top } : item
      )
    }
    );
  };

  return (
    <>
      {items.map((item: DragableItemProps) => (
        <DraggableItem key={item.id} id={item.id} left={item.left} top={item.top} children={item.children} moveItem={moveItem} />
      ))}
    </>
  );
};
