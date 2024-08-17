
export type DragableItemProps = {
    id: number | string, 
    left: number,
    top: number,   
    moveItem?: ({id, left, top}: Partial<DragableItemProps>) => void
    children?: React.ReactNode,
};

export type DragableContainerProps = 
    { items: DragableItemProps[], setItems?: React.Dispatch<React.SetStateAction<DragableItemProps[]>> }

export type CommonElementProps = {
    id?: string,
    disabled?: boolean,
    onClick?: (event: React.MouseEvent) => void;
}

export type DiceType = {
    id: number | string,
    type: 4 | 6 | 8 | 10 | 12 | 20 | 100,
    value?: number,
}

export type DragableStoreType = { 
    items: DragableItemProps[], 
    addNewItem: (props: DragableItemProps) => void,
    updateItems: ({ id, left, top }: DragableItemProps) => void,
    removeItems: () => void,
};

export type DiceStoreType = { 
    dices: DiceType[], 
    addNewDice: (props: DiceType) => void,
    rollDice: ({ id, value }: Partial<DiceType>) => void,
    removeDices: () => void,
};