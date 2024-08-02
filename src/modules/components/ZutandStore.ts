
import { create, StoreApi, UseBoundStore } from 'zustand';
import { DragableItemProps, StoreType } from "../types";

export const useStore: UseBoundStore<StoreApi<StoreType>>= create((set) => ({
        items: [],
        addNewItem: (props: DragableItemProps) => set((state: { items: DragableItemProps[] }) => ({ items: [...state.items, {...props}]})),
        updateItems: ({id, left, top}: DragableItemProps) => set((state: { items: DragableItemProps[] }) =>
            {
              return {items: [...state.items.map((item: any) =>{
                    return item.id === id ? { ...item, left, top } : item
                }
              )]}
            }),
        removeItems: () => set({ items: [] }),
    }));