
import { create, StoreApi, UseBoundStore } from 'zustand';
import { DiceStoreType, DiceType, DragableItemProps, DragableStoreType } from "../types";

export const useStore: UseBoundStore<StoreApi<DragableStoreType>>= create((set) => ({
        items: [],
        addNewItem: (props: DragableItemProps) => set((state: { items: DragableItemProps[] }) => ({ items: [...state.items, {...props}]})),
        updateItems: ({id, left, top}: DragableItemProps) => set((state: { items: DragableItemProps[] }) =>
            {
                return {items: [...state.items.map((item: DragableItemProps) =>{
                        return item.id === id ? { ...item, left, top } : item
                    }
                )]}
            }),
        removeItems: () => set({ items: [] }),
    }));

export const useDice: UseBoundStore<StoreApi<DiceStoreType>>= create((set) => ({
    dices: [],
    addNewDice: (props: DiceType) => set((state: { dices: DiceType[] }) => ({ dices: [...state.dices, {...props}]})),
    rollDice: ({id}: Partial<DiceType>) => set((state: { dices: DiceType[] }) =>
        {
            const value = Math.random();
            return {dices: [...state.dices.map((dice: DiceType) =>{
                    return dice.id === id ? { ...dice, value } : dice
                }
            )]}
        }),
    removeDices: () => set({ dices: [] }),
}));