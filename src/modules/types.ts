export type DragableItemProps = {
    id: number | string, 
    left: number,
    top: number,   
    moveItem?: ({id, left, top}: Partial<DragableItemProps>) => void
    children?: React.ReactNode,
};

export type DragableContainerProps = 
    { items: DragableItemProps[], setItems: React.Dispatch<React.SetStateAction<DragableItemProps[]>> }

export type CommonElementProps = {
    id?: string,
    disabled?: boolean,
    onClick?: (event: React.MouseEvent) => void;
}