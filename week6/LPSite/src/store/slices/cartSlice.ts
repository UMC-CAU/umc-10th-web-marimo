import cartItems from '../../constants/cartItems';
import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState : {
        cartItems: cartItems,
        amount: 0,
        total: 0,
    },
    reducers: {
        clearCart(state){
            state.cartItems = [];
            state.amount = 0;
            state.total = 0;
        },
        removeItem(state, action){
            const itemId = action.payload;
            state.cartItems =state.cartItems.filter((item) => item.id !== itemId);
        },
        increase(state, action){
            const itemId = action.payload;
            const item = state.cartItems.find((item) => item.id === itemId);
            if(item){
                item.amount = item.amount +1;
                state.amount = state.amount + 1;
                state.total = state.total + Number(item.price);
            }
        },
        decrease(state, action){
            const itemId = action.payload;
            const item = state.cartItems.find((item) => item.id === itemId);
            if(item){
                item.amount = item.amount - 1;
                state.amount = state.amount - 1;
                if(item.amount === 0){
                    state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
                }
                state.total = state.total - Number(item.price);
            }
        },
        calculateTotal(state){
            let amount =0;
            let total= 0;
            state.cartItems.forEach((item) => {
                amount =amount + item.amount;
                total = total + Number(item.price) * item.amount;
            });
            state.amount = amount;
            state.total = total;
        }
    } 
})


export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;