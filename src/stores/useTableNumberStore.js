import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTableNumberStore = create(persist(
    (set) => ({
        tableNumber: null,
        redirectPage: null,

        setTableNumber: (newNumber) => {
            set({ tableNumber: newNumber });
        },

        clearTableNumber: () => {
            set({ tableNumber: null })
        },

        clearRedirect: () => {
            set({ redirectPage: '' })
        }
    }),
    {
        name: 'table-storage',
        getStorage: () => localStorage,
    }
));

export default useTableNumberStore;
