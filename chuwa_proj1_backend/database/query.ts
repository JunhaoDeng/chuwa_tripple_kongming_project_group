import { Account, Product, Cart } from "./schema";

export function add_account(email: string, enc_password: string, type: string, 
            cart: string | null): Promise<any> {
    if (type !== "user" && type !== "vendor") {
        return Promise.reject(`Type ${type} is invalid`);
    }
    interface AccountDataType {
        email: string,
        enc_password: string,
        type: string,
        cart?: string
    };

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

