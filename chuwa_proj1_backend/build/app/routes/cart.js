"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router({ mergeParams: true });
// const router = express.Router();
var cart_1 = require("../handlers/cart");
// prefix - /api/users/:id/cart
router.route("/").get(cart_1.getAllProduct);
// prefix - /api/users/:id/cart/:productId
router
    .route("/:productId")
    .post(cart_1.increaseCart)
    .put(cart_1.decreaseCart)
    .delete(cart_1.removeProduct);
exports.default = router;
