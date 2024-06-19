import { StringSchemaDefinition } from "mongoose";
import { Account, Product, Cart } from "./schema";
import { AccountDataType, CartDataType } from "./types"

// this method only add an account. 
// It does not automatically create a cart for the account
export function create_account(email: string, enc_password: string, type: string, 
            cart: string | null): Promise<any> {
    if (type !== "user" && type !== "vendor") {
        return Promise.reject(`Type ${type} is invalid`);
    }

    let data: AccountDataType = {
        email: email,
        enc_password: enc_password,
        type: type
    }
    if (cart !== null) {
        data.cart = cart;
    }

    return Account.create(data);
}

export function get_account_by_email(email: string): Promise<any> {
    return Account.findOne({email: email});
}

export function create_cart(zip_code: string | null, discount_cent: number, 
            estimated_total_cent: number, belong_to: string): Promise<any> {

    const cart: CartDataType = {
        discount_cent: discount_cent,
        estimated_total_cent: estimated_total_cent,
    };
    if (zip_code !== null) {
        cart.zip_code = zip_code;
    }
    let cartid: string;
    return Cart.create(cart).then(crt => {
        cartid = crt._id;
        return Account.findById(belong_to);
    })
    .then(acc => {
        acc.cart = cartid;
        return acc.save();
    })
}

export function update_password_by_email(email: string, pwd: string) {
    return Account.findOneAndUpdate({ email: email }, { enc_password: pwd }, { new: true });
}