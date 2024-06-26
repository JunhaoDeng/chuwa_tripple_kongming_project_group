import mongoose, { Schema } from "mongoose";

const AccountSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    enc_password: {
        type: String,
        required: true
    },
    type: {
        type: String, // user | vendor
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
});

const ProductSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    price_cent: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img_link: {
        type: String,
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    create_time: {
        type: Date,
        required: true
    },
    update_time: {
        type: Date,
        required: true
    }
});

const CartSchema: Schema = new Schema({
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    zip_code: {
        type: String,
    },
    discount_cent: {
        type: Number
    },
    estimated_total_cent: {
        type: Number,
        required: true
    } 
});

export const Account: mongoose.Model<any> = mongoose.model("Account", AccountSchema);
export const Product: mongoose.Model<any> = mongoose.model("Product", ProductSchema);
export const Cart: mongoose.Model<any> = mongoose.model("Cart", CartSchema);