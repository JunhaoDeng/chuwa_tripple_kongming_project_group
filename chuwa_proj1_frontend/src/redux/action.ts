/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";

// Signin
export const signin_set_email = (state: any, actions: PayloadAction<string>) => {
    state.signin.email = actions.payload;
}

export const signin_set_email_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.signin.email_errormsg = actions.payload;
}

export const signin_set_password = (state: any, actions: PayloadAction<string>) => {
    state.signin.password = actions.payload;
}

export const signin_set_password_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.signin.password_errormsg = actions.payload;
}

export const signin_toggle_show_password = (state: any) => {
    state.signin.show_password = !state.signin.show_password;
}

// Signup
export const signup_set_email = (state: any, actions: PayloadAction<string>) => {
    state.signup.email = actions.payload;
}

export const signup_set_email_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.signup.email_errormsg = actions.payload;
}

export const signup_set_password = (state: any, actions: PayloadAction<string>) => {
    state.signup.password = actions.payload;
}

export const signup_set_password_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.signup.password_errormsg = actions.payload;
}

export const signup_set_isvendor = (state: any, actions: PayloadAction<boolean>) => {
    state.signup.isvendor_checked = actions.payload;
}

// Update password
export const update_password_set_email = (state: any, actions: PayloadAction<string>) => {
    state.update_password.email = actions.payload;
}

export const update_password_set_email_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.update_password.email_errormsg = actions.payload;
}