/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { create_product_set_category, create_product_set_category_errormsg, create_product_set_description, create_product_set_description_errormsg, create_product_set_image_link, create_product_set_image_link_errormsg, create_product_set_image_link_preview, create_product_set_image_link_preview_error, create_product_set_name, create_product_set_name_errormsg, create_product_set_price, create_product_set_price_errormsg, create_product_set_quantity, create_product_set_quantity_errormsg, product2_set_created_by, product_detail_set_category, product_detail_set_description, product_detail_set_id, product_detail_set_image_link, product_detail_set_name, product_detail_set_num_added, product_detail_set_price, products_set_one_num_added, products_set_page_selected, products_set_product_list, products_set_sortby, PSONAActionType, PSPLActionDataType, signin_set_email, signin_set_email_errormsg, signin_set_password, signin_set_password_errormsg, 
    signin_toggle_show_password, signup_set_email, signup_set_email_errormsg, signup_set_isvendor, 
    signup_set_password, signup_set_password_errormsg, update_password_set_email, 
    update_password_set_email_errormsg } from './action';


export type ASThunkDatatype = {
    url: string,
    product_id: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any
}
    
export const productDetailAsyncSetNumAdded = createAsyncThunk(
        "management-chuwa-slice/productDetailAsyncSetNumAdded",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async (thunkData: ASThunkDatatype, thunkAPI) => {
            console.log(thunkData);
            
            return fetch(thunkData.url, thunkData.options)
            .then(response => response.json())
            .then(data => {
                console.log("here");
                
                let newCount = 0;
                for (let i = 0; i < data.items.length; ++i) {
                    if (data.items[i].product === thunkData.product_id) {
                        newCount = Number(data.items[i].quantity);
                        break;
                    }
                }
                return newCount;
            })
            .catch(err => {
                return err;
            })
        }
);

export const productAsyncSetNumAdded = createAsyncThunk(
    "management-chuwa-slice/productAsyncSetNumAdded",
    async (thunkData: ASThunkDatatype, thunkAPI) => {
        console.log(thunkData);
            
        return fetch(thunkData.url, thunkData.options)
        .then(response => response.json())
        .then(data => {
            console.log("here");
            
            let newCount = 0;
            for (let i = 0; i < data.items.length; ++i) {
                if (data.items[i].product === thunkData.product_id) {
                    newCount = Number(data.items[i].quantity);
                    break;
                }
            }
            const result: PSONAActionType = {
                newCount: newCount,
                product_id: thunkData.product_id
            }
            return result;
        })
        .catch(err => {
            return err;
        })
    }
)

export type AsyncSetProductDataType = {
    products_url: string,
    cart_url: string,
    options: any
};

export const productsAsyncSetProductList = createAsyncThunk(
    "management-chuwa-slice/productsAsyncSetProductList",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (indata: AsyncSetProductDataType, thunkAPI) => {
       return Promise.all([fetch(indata.products_url, indata.options), 
            fetch(indata.cart_url, indata.options)])
        .then((resarr) => {
            return Promise.all([resarr[0].json(), resarr[1].json()]);
        })
        .then(dataarr => {
            const product_list: any = dataarr[0], cart: any = dataarr[1];
            
            // type PSPLActionDataType = {
            //     id: string,
            //     name: string,
            //     price: number,
            //     num_added: number,
            //     image_link: string
            // }[];
            const cartresult: any = {};
            for (const ele of cart.cartItems) {
                cartresult[ele.productId] = ele.quantity;
            }
            const result: PSPLActionDataType[] = product_list.map((item: any) =>{
                return {
                    id: item._id,
                    name: item.name,
                    price: item.price_cent,
                    image_link: item.img_link,
                    num_added: ((item._id in cartresult) ? cartresult[item._id] : 0),
                    created_by: {...item.created_by},
                    quantity: item.quantity
                }
            });
            return result;
        });
    }
)

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

            page_selected: 0 // current page number selected. 0-indexed. 
        },
        products2: {
            created_by: []
        },
        product_detail: {
            id: "", // unique id of product assigned by mongodb
            name: "", // product name
            price: 0, // product price, in cent
            num_added: 0, // number of products added
            image_link: "", // product image link
            description: "", // description
            category: "" // category 
        },
        cart: {
            cartitems: [], // list of numbers indexing to products.product_list
            discount_code: "", // discount code input data
            subtotal: 0, // subtotal in cent
            discount: 0 // in cent, should <= 0
            // tax and estimated total is calculated with subtotal and discount. 
        }

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

        productsSetProductList: products_set_product_list,
        productsSetSortby: products_set_sortby,
        productsSetPageSelected: products_set_page_selected,


        productDetailSetId: product_detail_set_id,
        productDetailSetName: product_detail_set_name,
        productDetailSetPrice: product_detail_set_price,
        productDetailSetNumAdded: product_detail_set_num_added,
        productDetailSetImageLink: product_detail_set_image_link,
        productDetailSetDescription: product_detail_set_description,
        productDetailSetCategory: product_detail_set_category

    },

    extraReducers: (builder) => {
        builder.addCase(productDetailAsyncSetNumAdded.fulfilled, product_detail_set_num_added);
        builder.addCase(productsAsyncSetProductList.fulfilled, products_set_product_list);
        builder.addCase(productAsyncSetNumAdded.fulfilled, products_set_one_num_added);
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

        productsSetProductList, productsSetSortby,
        productsSetPageSelected,

        productDetailSetId, productDetailSetName,
        productDetailSetPrice, productDetailSetNumAdded,
        productDetailSetImageLink, productDetailSetDescription,
        productDetailSetCategory
    } = Slice.actions;


export default Slice.reducer;
