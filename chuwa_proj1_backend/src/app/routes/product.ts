import express = require("express");
const router = express.Router({ mergeParams: true });
import {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../handlers/product";

// prefix - /api/users/:id/product
router.route("/").post(createProduct);

// prefix - /api/users/:id/product/:product_id
router
  .route("/:product_id")
  .get(getProduct)
  .delete(deleteProduct)
  .put(updateProduct);

export default router;
