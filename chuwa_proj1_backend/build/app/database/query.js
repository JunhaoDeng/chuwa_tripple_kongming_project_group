"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_account = create_account;
exports.get_account_by_email = get_account_by_email;
exports.create_cart = create_cart;
exports.update_password_by_email = update_password_by_email;
exports.create_product = create_product;
var schema_1 = require("./schema");
var utility_1 = require("./utility");
// create an account
// RETURN: a Promise either resolve to the new account id, or rejected.
// this method only add an account.
// It does not automatically create a cart for the account
function create_account(email, enc_password, type, cart) {
    if (type !== "user" && type !== "vendor") {
        return Promise.reject("Type ".concat(type, " is invalid"));
    }
    var data = {
        email: email,
        enc_password: enc_password,
        type: type,
    };
    (0, utility_1.insert_nonnull_prop)(data, "cart", cart);
    return schema_1.Account.create(data).then(function (acc) {
        return acc._id;
    });
}
// find an account based on email
// RETURN: a promise resolve to document|null, or rejected.
function get_account_by_email(email) {
    return schema_1.Account.findOne({ email: email });
}
// create a cart belongs to an account
// RETURN: a promise resolve to new cart's id, or rejected.
function create_cart(zip_code, discount_cent, estimated_total_cent, belong_to) {
    var cart = {
        discount_cent: discount_cent,
        estimated_total_cent: estimated_total_cent,
    };
    (0, utility_1.insert_nonnull_prop)(cart, "zip_code", zip_code);
    var cartid;
    return schema_1.Cart.create(cart)
        .then(function (crt) {
        cartid = crt._id;
        return schema_1.Account.findById(belong_to);
    })
        .then(function (acc) {
        acc.cart = cartid;
        return cartid;
    });
}
// update password of an account based on its email
// RETURN: a promise resolve to update result.
function update_password_by_email(email, pwd) {
    return schema_1.Account.findOneAndUpdate({ email: email }, { enc_password: pwd }, { new: true });
}
// create a product belongs to an account
// RETURN: a promise resolve to product id, or rejected.
function create_product(name, description, category, price_cent, quantity, img_link, created_by) {
    var d = new Date();
    var product = {
        name: name,
        price_cent: price_cent,
        quantity: quantity,
        created_by: created_by,
        create_time: d,
        update_time: d,
    };
    (0, utility_1.insert_nonnull_prop)(product, "description", description);
    (0, utility_1.insert_nonnull_prop)(product, "category", category);
    (0, utility_1.insert_nonnull_prop)(product, "img_link", img_link);
    var prod_id;
    var creator;
    return schema_1.Account.findById(created_by)
        .then(function (acc) {
        if (acc === null) {
            return Promise.reject("The account id specified in \n                created_by: ".concat(created_by, " does not exist."));
        }
        else {
            creator = acc;
            return schema_1.Product.create(product);
        }
    })
        .then(function (prod) {
        prod_id = prod._id;
        creator.products.push(prod_id);
        return creator.save();
    })
        .then(function (acc) {
        return prod_id;
    });
}
