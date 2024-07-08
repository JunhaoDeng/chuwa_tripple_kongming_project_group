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

// create product
export const create_product_set_name = (state: any, actions: PayloadAction<string>) => {
    state.create_product.name = actions.payload
}

export const create_product_set_name_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.create_product.name_errormsg = actions.payload
}

export const create_product_set_description = (state: any, actions: PayloadAction<string>) => {
    state.create_product.description = actions.payload
}

export const create_product_set_description_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.create_product.description_errormsg = actions.payload
}

export const create_product_set_category = (state: any, actions: PayloadAction<string>) => {
    state.create_product.category = actions.payload
}

export const create_product_set_category_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.create_product.category_errormsg = actions.payload
}

export const create_product_set_price = (state: any, actions: PayloadAction<number>) => {
    state.create_product.price = actions.payload
}

export const create_product_set_price_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.create_product.price_errormsg = actions.payload
}

export const create_product_set_quantity = (state: any, actions: PayloadAction<number>) => {
    state.create_product.quantity = actions.payload
}

export const create_product_set_quantity_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.create_product.quantity_errormsg = actions.payload
}

export const create_product_set_image_link = (state: any, actions: PayloadAction<string>) => {
    state.create_product.image_link = actions.payload
}

export const create_product_set_image_link_errormsg = (state: any, actions: PayloadAction<string>) => {
    state.create_product.image_link_errormsg = actions.payload
}

export const create_product_set_image_link_preview = (state: any, actions: PayloadAction<string>) => {
    state.create_product.image_link_preview = actions.payload
}

export const create_product_set_image_link_preview_error = (state: any, actions: PayloadAction<boolean>) => {
    state.create_product.image_link_preview_error = actions.payload
}

