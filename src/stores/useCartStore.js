import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            carts: [],

            getCartQty: () => {
                console.log(get().carts)
                const currentCarts = get().carts;
                const totalQty = Array.isArray(currentCarts)
                    ? currentCarts.reduce((total, cartItem) => total + cartItem.qty, 0)
                    : 0;
                return totalQty;
            },

            addToCart: (id, qty) => {
                set((state) => {
                    const updatedCart = Array.isArray(state.carts) ? [...state.carts] : [];
                    const existingItemIndex = updatedCart.findIndex((item) => item.id === id);

                    if (existingItemIndex !== -1)
                        updatedCart[existingItemIndex].qty += qty
                    else
                        updatedCart.push({ id, qty, selected: true })

                    return { carts: updatedCart }
                })
            },

            removeFromCart: (id) => {
                set((state) => {
                    const updatedCart = Array.isArray(state.carts) ? state.carts.filter((item) => item.id !== id) : []
                    return { carts: updatedCart }
                })
            },

            changeSelected: (id, value) => {
                set((state) => {
                    const updatedCarts = Array.isArray(state.carts) ? state.carts.map((item) =>
                        item.id === id ? { ...item, selected: value } : item
                    ) : [];
                    return { carts: updatedCarts };
                });
            },

            toggleSelected: (id) => {
                set((state) => {
                    const updatedCarts = Array.isArray(state.carts)
                        ? state.carts.map((item) =>
                            item.id === id
                                ? { ...item, selected: !item.selected } // Toggle pilihan
                                : item
                        )
                        : [];
                    return { carts: updatedCarts };
                });
            },

            increaseQuantity: (id, value) => {
                set((state) => {
                    const updatedCarts = Array.isArray(state.carts)
                        ? state.carts.map((item) =>
                            item.id === id
                                ? { ...item, qty: Math.max(0, item.qty + value) } // Use Math.max to ensure qty doesn't go below 0
                                : item
                        )
                        : [];
                    return { carts: updatedCarts };
                });
            },

            clearCheckedCart: () => {
                set((state) => {
                    const newCart = [...state.carts]
                    return { carts: newCart.filter((item) => !item.selected) }
                })
            }

        }),
        {
            name: "cart-storage",
            getStorage: () => localStorage,
        }
    )
);

export default useCartStore;
