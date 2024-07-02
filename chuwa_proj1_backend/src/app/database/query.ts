import { StringSchemaDefinition } from "mongoose";
import { Account, Product, Cart } from "./schema";
import {
  AccountDataType,
  CartDataType,
  IDString,
  ProductDataType,
} from "./type";
import { insert_nonnull_prop } from "./utility";

// create an account
// RETURN: a Promise either resolve to the new account id, or rejected.
// this method only add an account.
// It does not automatically create a cart for the account
export function create_account(
  email: string,
  enc_password: string,
  type: string,
  cart: string | null
): Promise<IDString> {
  if (type !== "user" && type !== "vendor") {
    return Promise.reject(`Type ${type} is invalid`);
  }

  let data: AccountDataType = {
    email: email,
    enc_password: enc_password,
    type: type,
  };
  insert_nonnull_prop(data, "cart", cart);

  return Account.create(data).then((acc) => {
    return acc._id;
  });
}

// find an account based on email
// RETURN: a promise resolve to document|null, or rejected.
export function get_account_by_email(email: string): Promise<any> {
  return Account.findOne({ email: email });
}

// create a cart belongs to an account
// RETURN: a promise resolve to new cart's id, or rejected.
export function create_cart(
  zip_code: string | null,
  discount_cent: number,
  estimated_total_cent: number,
  belong_to: string
): Promise<IDString> {
  const cart: CartDataType = {
    discount_cent: discount_cent,
    estimated_total_cent: estimated_total_cent,
  };
  insert_nonnull_prop(cart, "zip_code", zip_code);
  let cartid: string;
  return Cart.create(cart)
    .then((crt) => {
      cartid = crt._id;
      return Account.findById(belong_to);
    })
    .then((acc) => {
      acc.cart = cartid;
      return cartid;
    });
}

// update password of an account based on its email
// RETURN: a promise resolve to update result.
export function update_password_by_email(
  email: string,
  pwd: string
): Promise<any> {
  return Account.findOneAndUpdate(
    { email: email },
    { enc_password: pwd },
    { new: true }
  );
}

// create a product belongs to an account
// RETURN: a promise resolve to product id, or rejected.
export function create_product(
  name: string,
  description: string | null,
  category: string | null,
  price_cent: number,
  quantity: number,
  img_link: string | null,
  created_by: string
): Promise<IDString> {
  let d = new Date();
  let product: ProductDataType = {
    name: name,
    price_cent: price_cent,
    quantity: quantity,
    created_by: created_by,
    create_time: d,
    update_time: d,
  };
  insert_nonnull_prop(product, "description", description);
  insert_nonnull_prop(product, "category", category);
  insert_nonnull_prop(product, "img_link", img_link);
  let prod_id: string;
  let creator: any;
  return Account.findById(created_by)
    .then((acc) => {
      if (acc === null) {
        return Promise.reject(`The account id specified in 
                created_by: ${created_by} does not exist.`);
      } else {
        creator = acc;
        return Product.create(product);
      }
    })
    .then((prod) => {
      prod_id = prod._id;
      creator.products.push(prod_id);
      return creator.save();
    })
    .then((acc) => {
      return prod_id;
    });
}
