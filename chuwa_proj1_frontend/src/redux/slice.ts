import { createSlice } from "@reduxjs/toolkit";
import {
  create_product_set_category,
  create_product_set_category_errormsg,
  create_product_set_description,
  create_product_set_description_errormsg,
  create_product_set_image_link,
  create_product_set_image_link_errormsg,
  create_product_set_image_link_preview,
  create_product_set_image_link_preview_error,
  create_product_set_name,
  create_product_set_name_errormsg,
  create_product_set_price,
  create_product_set_price_errormsg,
  create_product_set_quantity,
  create_product_set_quantity_errormsg,
  product_detail_set_category,
  product_detail_set_description,
  product_detail_set_id,
  product_detail_set_image_link,
  product_detail_set_name,
  product_detail_set_num_added,
  product_detail_set_price,
  signin_set_email,
  signin_set_email_errormsg,
  signin_set_password,
  signin_set_password_errormsg,
  signin_toggle_show_password,
  signup_set_email,
  signup_set_email_errormsg,
  signup_set_isvendor,
  signup_set_password,
  signup_set_password_errormsg,
  update_password_set_email,
  update_password_set_email_errormsg,
  signup_clear_email,
  signup_clear_password,
} from "./action";
import { sign } from "jsonwebtoken";

const Slice = createSlice({
  name: "management-chuwa-slice",
  initialState: {
    signin: {
      // signin page
      email: "", // email input data
      email_errormsg: "",
      password: "", // password input data
      password_errormsg: "",
      show_password: false, // whether the password is shown or hide
    },
    signup: {
      // signup page
      email: "", // email input data
      email_errormsg: "",
      password: "", // password input data
      password_errormsg: "",
      isvendor_checked: false,
    },
    update_password: {
      // update_password page
      email: "", // email input data
      email_errormsg: "",
    },
    create_product: {
      // create_product page
      name: "", // product name input data
      name_errormsg: "",
      description: "", // product description input data
      description_errormsg: "",
      category: "", // category input data
      category_errormsg: "",
      price: null, // price input data. Should be number
      price_errormsg: "",
      quantity: null, // quantity input data. Should be number
      quantity_errormsg: "",
      image_link: "", // image link input data.
      image_link_errormsg: "",
      // current image link. This is what shown in image preview and is updated after user clicks "update"
      image_link_preview: "",
      // set to true if preview image failed to load
      image_link_preview_error: false,
    },
    products: {
      // list of product shown on the web page
      // data format in product list:
      // {
      //   id: string -> unique id of product assigned by mongodb
      //   name: string -> product name
      //   price: number -> product price, in cent
      //   num_added: number -> number of products added
      //   image_link: product image link
      // }
      product_list: [],

      // 0 -> sort by last added.
      // 1 -> sort by price low to high
      // 2 -> sort by price high to low
      sortby: 0,

      page_selected: 0, // current page number selected. 0-indexed.
    },
    product_detail: {
      id: "", // unique id of product assigned by mongodb
      name: "", // product name
      price: 0, // product price, in cent
      num_added: 0, // number of products added
      image_link: "", // product image link
      description: "", // description
      category: "", // category
    },
    cart: {
      cartitems: [], // list of numbers indexing to products.product_list
      discount_code: "", // discount code input data
      subtotal: 0, // subtotal in cent
      discount: 0, // in cent, should <= 0
      // tax and estimated total is calculated with subtotal and discount.
    },
  },
  reducers: {
    signinSetEmail: signin_set_email,
    signinSetEmailErrormsg: signin_set_email_errormsg,
    signinSetPassword: signin_set_password,
    signinSetPasswordErrormsg: signin_set_password_errormsg,
    signinToggleShowPassword: signin_toggle_show_password,

    signupSetEmail: signup_set_email,
    signupSetEmailErrormsg: signup_set_email_errormsg,
    signupSetPassword: signup_set_password,
    signupSetPasswordErrormsg: signup_set_password_errormsg,
    signupSetIsvendor: signup_set_isvendor,
    signupClearEmail: signup_clear_email,
    signupClearPassword: signup_clear_password,

    updatePasswordSetEmail: update_password_set_email,
    updatePasswordSetEmailErrormsg: update_password_set_email_errormsg,

    createProductSetName: create_product_set_name,
    createProductSetNameErrormsg: create_product_set_name_errormsg,
    createProductSetDescription: create_product_set_description,
    createProductSetDescriptionErrormsg:
      create_product_set_description_errormsg,
    createProductSetCategory: create_product_set_category,
    createProductSetCategoryErrormsg: create_product_set_category_errormsg,
    createProductSetPrice: create_product_set_price,
    createProductSetPriceErrormsg: create_product_set_price_errormsg,
    createProductSetQuantity: create_product_set_quantity,
    createProductSetQuantityErrormsg: create_product_set_quantity_errormsg,
    createProductSetImageLink: create_product_set_image_link,
    createProductSetImageLinkErrormsg: create_product_set_image_link_errormsg,
    createProductSetImageLinkPreview: create_product_set_image_link_preview,
    createProductSetImageLinkPreviewError:
      create_product_set_image_link_preview_error,

    productDetailSetId: product_detail_set_id,
    productDetailSetName: product_detail_set_name,
    productDetailSetPrice: product_detail_set_price,
    productDetailSetNumAdded: product_detail_set_num_added,
    productDetailSetImageLink: product_detail_set_image_link,
    productDetailSetDescription: product_detail_set_description,
    productDetailSetCategory: product_detail_set_category,
  },
});

export const {
  signinSetEmail,
  signinSetEmailErrormsg,
  signinSetPassword,
  signinSetPasswordErrormsg,
  signinToggleShowPassword,

  signupSetEmail,
  signupSetEmailErrormsg,
  signupSetPassword,
  signupSetPasswordErrormsg,
  signupSetIsvendor,
  signupClearEmail,
  signupClearPassword,

  updatePasswordSetEmail,
  updatePasswordSetEmailErrormsg,

  createProductSetName,
  createProductSetNameErrormsg,
  createProductSetDescription,
  createProductSetDescriptionErrormsg,
  createProductSetCategory,
  createProductSetCategoryErrormsg,
  createProductSetPrice,
  createProductSetPriceErrormsg,
  createProductSetQuantity,
  createProductSetQuantityErrormsg,
  createProductSetImageLink,
  createProductSetImageLinkErrormsg,
  createProductSetImageLinkPreview,
  createProductSetImageLinkPreviewError,

  productDetailSetId,
  productDetailSetName,
  productDetailSetPrice,
  productDetailSetNumAdded,
  productDetailSetImageLink,
  productDetailSetDescription,
  productDetailSetCategory,
} = Slice.actions;

export default Slice.reducer;
