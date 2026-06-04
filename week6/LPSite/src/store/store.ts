import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import modalReducer from './modal/modalSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>;