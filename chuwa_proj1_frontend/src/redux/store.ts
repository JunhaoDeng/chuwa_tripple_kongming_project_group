import { configureStore } from "@reduxjs/toolkit";
import slicereducer from "./slice"

const store = configureStore({
    reducer: slicereducer
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch