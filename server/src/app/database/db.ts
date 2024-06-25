import mongoose from "mongoose";
mongoose.set("debug", true);
mongoose.Promise = Promise;
require("dotenv").config({ path: ".env" });

// write your own pwd and uri
// const pwd: string = process.env.MONGODB_ATLAS_PWD || "";
// // console.log(pwd);
// const uri: string = `mongodb+srv://degjnd:${encodeURIComponent(
//   pwd
// )}@cluster0.hpelqzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri: string = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected");
  })
  .catch((err: Error) => {
    console.log(err);
  });

// Import schemas
import { Account, Product, Cart } from "./schema";

// Export models
export { Account, Product, Cart };

// // Call this function to connect to the mongodb atlas database
export function connect_db() {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected");
    })
    .catch((err: Error) => {
      console.log(err);
    });
}
