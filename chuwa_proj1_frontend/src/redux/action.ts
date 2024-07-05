/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";

export const signin_set_email = (state: any, actions: PayloadAction<string>) => {
    state.signin.email = actions.payload;
}

export const signin_set_password = (state: any, actions: PayloadAction<string>) => {
    state.signin.password = actions.payload;
}

export const signin_toggle_show_password = (state: any) => {
    state.signin.show_password = !state.signin.show_password;
}

export const signup_set_email = (state: any, actions: PayloadAction<string>) => {
    state.signup.email = actions.payload;
}

export const signup_set_password = (state: any, actions: PayloadAction<string>) => {
    state.signup.password = actions.payload;
}

export const update_password_set_email = (state: any, actions: PayloadAction<string>) => {
    state.update_password.email = actions.payload;
}
