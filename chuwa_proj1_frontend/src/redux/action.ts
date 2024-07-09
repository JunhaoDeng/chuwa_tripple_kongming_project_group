/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Signin
export const signin_set_email = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signin.email = actions.payload;
};

export const signin_set_email_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signin.email_errormsg = actions.payload;
};

export const signin_set_password = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signin.password = actions.payload;
};

export const signin_set_password_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signin.password_errormsg = actions.payload;
};

export const signin_toggle_show_password = (state: any) => {
  state.signin.show_password = !state.signin.show_password;
};

// Signup
export const signup_set_email = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signup.email = actions.payload;
};

export const signup_clear_email = (state: any) => {
  state.signup.email = "";
};

export const signup_set_email_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signup.email_errormsg = actions.payload;
};

export const signup_set_password = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signup.password = actions.payload;
};

export const signup_clear_password = (state: any) => {
  state.signup.password = "";
};

export const signup_set_password_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.signup.password_errormsg = actions.payload;
};

export const signup_set_isvendor = (
  state: any,
  actions: PayloadAction<boolean>
) => {
  state.signup.isvendor_checked = actions.payload;
};

// Update password
export const update_password_set_email = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.update_password.email = actions.payload;
};

export const update_password_set_email_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.update_password.email_errormsg = actions.payload;
};

// create product
export const create_product_set_name = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.name = actions.payload;
};

export const create_product_set_name_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.name_errormsg = actions.payload;
};

export const create_product_set_description = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.description = actions.payload;
};

export const create_product_set_description_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.description_errormsg = actions.payload;
};

export const create_product_set_category = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.category = actions.payload;
};

export const create_product_set_category_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.category_errormsg = actions.payload;
};

export const create_product_set_price = (
  state: any,
  actions: PayloadAction<number>
) => {
  state.create_product.price = actions.payload;
};

export const create_product_set_price_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.price_errormsg = actions.payload;
};

export const create_product_set_quantity = (
  state: any,
  actions: PayloadAction<number>
) => {
  state.create_product.quantity = actions.payload;
};

export const create_product_set_quantity_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.quantity_errormsg = actions.payload;
};

export const create_product_set_image_link = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.image_link = actions.payload;
};

export const create_product_set_image_link_errormsg = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.image_link_errormsg = actions.payload;
};

export const create_product_set_image_link_preview = (
  state: any,
  actions: PayloadAction<string>
) => {
  state.create_product.image_link_preview = actions.payload;
};

export const create_product_set_image_link_preview_error = (
  state: any,
  actions: PayloadAction<boolean>
) => {
  state.create_product.image_link_preview_error = actions.payload;
};

export type PSPLActionDataType = {
    id: string,
    name: string,
    price: number,
    num_added: number,
    image_link: string,
    created_by: {
        _id: string,
        email: string,
        type: string
    },
    quantity: number
}[];

// products
export const products_set_product_list = (state: any, actions: PayloadAction<PSPLActionDataType[]>) => {
    state.products.product_list = actions.payload.map((item: PSPLActionDataType, index) => {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            num_added: item.num_added,
            image_link: item.image_link
        }
    });
    state.products.product_list = state.products.product_list.reverse();

    state.products2.created_by = actions.payload.map(item  => {
        return item.created_by;
    });
    state.products2.created_by = state.products2.created_by.reverse();
}

export const products_sort_product_list_ltoh = (state: any) => {
  const indices = Array.from({ length: state.products.product_list.length }, (v, i) => i);
  indices.sort((a, b) => state.products.product_list[a].price - state.products.product_list[b].price);
  state.products.product_list = indices.map(i => state.products.product_list[i]);
  state.products2.created_by = indices.map(i => state.products2.created_by[i]);
}

export const products_sort_product_list_htol = (state: any) => {
  const indices = Array.from({ length: state.products.product_list.length }, (v, i) => i);
  indices.sort((a, b) => state.products.product_list[b].price - state.products.product_list[a].price);
  state.products.product_list = indices.map(i => state.products.product_list[i]);
  state.products2.created_by = indices.map(i => state.products2.created_by[i]);
}

export const products_set_page_selected = (state: any, actions: PayloadAction<number>) => {
    state.products.page_selected = actions.payload;
}

export type PSONAActionType = {
    newCount: number,
    product_id: string
}

export const products_set_one_num_added = (state: any, actions: PayloadAction<PSONAActionType>) => {
    for (let i = 0; i < state.products.product_list.length; ++i) {
        if (state.products.product_list[i].id === actions.payload.product_id) {
            state.products.product_list[i].num_added = actions.payload.newCount;
            break;
        }
    }

}

export const add_or_update_cart_item = (state: any, actions: PayloadAction<PSONAActionType>) => {
  for (let i = 0; i < state.products.product_list.length; ++i) {
      if (state.cart.cartItems[i].productId === actions.payload.product_id) {
          state.cart.cartItems[i].quantity = actions.payload.newCount;
          break;
      }
  }

}

// products2
// export const product2_set_created_by = (state: any, actions: PayloadAction<PSPLActionDataType[]>) => {
//     state.products2.created_by = actions.payload.map(item  => {
//         return item.created_by._id;
//     });
// }

// product_detail
export const product_detail_set_id = (
  state: any,
  action: PayloadAction<string>
) => {
  state.product_detail.id = action.payload;
};

export const product_detail_set_name = (
  state: any,
  action: PayloadAction<string>
) => {
  state.product_detail.name = action.payload;
};

export const product_detail_set_price = (
  state: any,
  action: PayloadAction<number>
) => {
  state.product_detail.price = action.payload;
};

export const product_detail_set_num_added = (
  state: any,
  action: PayloadAction<number>
) => {
  state.product_detail.num_added = action.payload;
};

export const product_detail_set_image_link = (
  state: any,
  action: PayloadAction<string>
) => {
  state.product_detail.image_link = action.payload;
};

export const product_detail_set_description = (
  state: any,
  action: PayloadAction<string>
) => {
  state.product_detail.description = action.payload;
};

export const product_detail_set_category = (
  state: any,
  action: PayloadAction<string>
) => {
  state.product_detail.category = action.payload;
};
