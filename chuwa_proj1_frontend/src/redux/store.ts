import { configureStore } from "@reduxjs/toolkit";
import slicereducer from "./slice"
import cartReducer from './cartSlice';

const store = configureStore({
    reducer: slicereducer
});

// const store = configureStore({
//     reducer: {
//         cart: cartReducer,
//         slicereducer: slicereducer}
// });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;