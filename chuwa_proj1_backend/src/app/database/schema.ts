import mongoose, { Schema } from "mongoose";
// const bcrypt = require("bcrypt");
import { hash, compare } from "bcrypt";

const AccountSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  enc_password: {
    type: String,
    required: true,
  },
  type: {
    type: String, // user | vendor
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
});

AccountSchema.pre("save", async function (next) {
  try {
    console.log("this", this);
    if (!this.isModified("enc_password")) {
      console.log("not modified");
      return next();
    }
    console.log("enc_password modified", this.enc_password);
    console.log("enc_password modified", typeof this.enc_password);
    const hashedPassword = await hash(this.enc_password, 10);
    // const hashedPassword = await bcrypt.hash(this.enc_password || "", 10);
    console.log("hashedPassword", hashedPassword);
    this.enc_password = hashedPassword;
    return next();
  } catch (err) {
    // console.log("err", err);
    return next(err);
  }
});

AccountSchema.methods.comparePassword = async function (
  candidatePassword: string,
  next
) {
  try {
    let isMatched = await compare(candidatePassword, this.enc_password);
    return isMatched;
  } catch (err) {
    return next(err);
  }
};

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  price_cent: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  img_link: {
    type: String,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  create_time: {
    type: Date,
    // required: true,
  },
  update_time: {
    type: Date,
    // required: true,
  },
});

const CartSchema: Schema = new Schema({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  zip_code: {
    type: String,
  },
  discount_cent: {
    type: Number,
  },
  estimated_total_cent: {
    type: Number,
    required: true,
  },
});

export const Account: mongoose.Model<any> = mongoose.model(
  "Account",
  AccountSchema
);
export const Product: mongoose.Model<any> = mongoose.model(
  "Product",
  ProductSchema
);
export const Cart: mongoose.Model<any> = mongoose.model("Cart", CartSchema);

// const Account = mongoose.model("Account", AccountSchema);
// const Product = mongoose.model("Product", ProductSchema);
// const Cart = mongoose.model("Cart", CartSchema);

// export { Account, Product, Cart };
