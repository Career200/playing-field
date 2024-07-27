import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { DragableItemProps } from '../types';

export const DraggableItem = ({ id, children, left, top, moveItem = () => {} } : DragableItemProps) => {
    const ref = useRef(null);
  
    const [{ isDragging }, drag] = useDrag({
      type: 'item',
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        clientOffset: monitor.getClientOffset(),
      }),
      end: (item, monitor) => {
        if (!monitor.didDrop()) {
          const delta = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
          const newLeft = Math.round(item.left + delta.x);
          const newTop = Math.round(item.top + delta.y);
          moveItem({ id: item.id, left: newLeft, top: newTop});
        }
      },
    });
  
    drag(ref);
  
    return (
        <div
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          position: 'fixed',
          left,
          top,
        }}
      >
        {children}
      </div>
    );
  };
