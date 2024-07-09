const express = require("express");
const router = express.Router({ mergeParams: true });
// const router = express.Router();
import { getAllProduct, increaseCart, decreaseCart, removeProduct } from "../handlers/cart";

// prefix - /api/users/:id/cart
router.route("/").get(getAllProduct);

// prefix - /api/users/:id/cart/:productId
router
  .route("/:productId")
  .post(increaseCart)
  .put(decreaseCart)
  .delete(removeProduct);


export default router;