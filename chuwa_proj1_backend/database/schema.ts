import mongoose, { Schema } from "mongoose";

const AccountSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    enc_password: {
        type: String,
        required: true
    },
    type: {
        type: String, // User / Vendor
        required: true
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
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
    priceCent: {
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

export const Account: mongoose.Model<any> = mongoose.model("Account", AccountSchema);
export const Product: mongoose.Model<any> = mongoose.model("Product", ProductSchema);