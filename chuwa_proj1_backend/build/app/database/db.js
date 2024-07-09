"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.Product = exports.Account = void 0;
exports.connect_db = connect_db;
var mongoose_1 = require("mongoose");
mongoose_1.default.set("debug", true);
mongoose_1.default.Promise = Promise;
require("dotenv").config({ path: ".env" });
// write your own pwd and uri
var pwd = process.env.MONGODB_ATLAS_PWD || "";
// console.log(pwd);
var uri = "mongodb+srv://degjnd:".concat(encodeURIComponent(pwd), "@cluster0.hpelqzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// const uri: string = process.env.MONGODB_URI;
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Connected");
//   })
//   .catch((err: Error) => {
//     console.log(err);
//   });
// Import schemas
var schema_1 = require("./schema");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return schema_1.Account; } });
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return schema_1.Product; } });
Object.defineProperty(exports, "Cart", { enumerable: true, get: function () { return schema_1.Cart; } });
// // Call this function to connect to the mongodb atlas database
function connect_db() {
    mongoose_1.default
        .connect(uri)
        .then(function () {
        console.log("Connected");
    })
        .catch(function (err) {
        console.log(err);
    });
}
