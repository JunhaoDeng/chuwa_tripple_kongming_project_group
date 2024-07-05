import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const signin_set_email = (state: RootState, actions: PayloadAction<string>) => {
    state.signin.email = actions.payload;
}

export const signin_set_password = (state: RootState, actions: PayloadAction<string>) => {
    state.signin.password = actions.payload;
}

export const signin_toggle_show_password = (state: RootState) => {
    state.signin.show_password = !state.signin.show_password;
}

