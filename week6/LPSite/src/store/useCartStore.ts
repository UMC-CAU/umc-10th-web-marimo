import {create} from 'zustand'
import cartItems from '../constants/cartItems';

interface CartItem {
    id: string;
    title: string;
    singer: string;
    price: string;
    img: string;
    amount: number;
}

interface CartStore {
    cartItems: CartItem[]
    amount: number
    total: number
    increase: (id: string) => void
    decrease: (id: string) => void
    removeItem: (id: string) => void
    clearCart: () => void
    calculateTotal: () => void 
}

const useCartStore = create<CartStore>((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,

    increase: (id) => set((state) => {
        const updatedCartItems = state.cartItems.map((item) => {
            if(item.id === id){
                return {...item, amount: item.amount + 1}
            }
            return item;
        });
        return { cartItems: updatedCartItems };
    }),
    decrease: (id) => set((state) => {
        const updatedCartItems = state.cartItems.map((item) => {
            if(item.id === id){
                return {...item, amount: item.amount - 1}
            }
            return item;
        });
        return { cartItems: updatedCartItems };
    }),

    removeItem: (id) => set((state) => {
        const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
        return { cartItems: updatedCartItems };
    }),

    clearCart: () => set(() => ({
        cartItems: [],
        amount: 0,
        total: 0,
    })),

    calculateTotal: () => set((state) => {
        let amount = 0;
        let total = 0; 
        state.cartItems.forEach((item) => {
            amount += item.amount;
            total += Number(item.price) * item.amount;
        });
        return { amount, total };
    }),
}))

export default useCartStore;
