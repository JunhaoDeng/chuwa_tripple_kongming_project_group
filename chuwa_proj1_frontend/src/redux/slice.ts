import { createSlice } from '@reduxjs/toolkit';

const Slice = createSlice({
    name: "management-chuwa-slice",
    initialState: {
        signin: { // signin page
            email: "", // email input data
            password: "", // password input data
            show_password: false // whether the password is shown or hide
        },
        singup: { // signup page
            email: "", // email input data
            password: "" // password input data
        },
        update_password: { // update_password page
            email: "" // email input data
        },
        create_product: { // create_product page
            name: "", // product name input data
            description: "", // product description input data
            category: "", // category input data
            price: null, // price input data. Should be number
            quantity: null, // quantity input data. Should be number
            image_link: "", // image link input data. 

            // current image link. This is what shown in image preview and is updated after user clicks "update"
            image_link_preview: "" 
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
    reducers: {}
});

// export const {} = Slice.actions;
export default Slice.reducer