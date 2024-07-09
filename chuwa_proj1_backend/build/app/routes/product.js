"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router({ mergeParams: true });
var product_1 = require("../handlers/product");
// prefix - /api/users/:id/product
router.route("/").post(product_1.createProduct);
// prefix - /api/users/:id/product/:product_id
router
    .route("/:product_id")
    .get(product_1.getProduct)
    .delete(product_1.deleteProduct)
    .put(product_1.updateProduct);
exports.default = router;
