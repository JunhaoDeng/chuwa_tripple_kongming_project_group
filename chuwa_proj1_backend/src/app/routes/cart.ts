const express = require("express");
const router = express.Router({ mergeParams: true });
// const router = express.Router();
import { getAllProduct, increaseCart, decreaseCart, removeProduct } from "../handlers/cart";
// const { getAllProduct, increaseCart, decreaseCart, removeProduct } =  require ("../handlers/cart");

// check

// prefix - /api/users/:id/cart
router.route("/").get(getAllProduct);

// prefix - /api/users/:id/cart/:productId
router
  .route("/:productId")
  .post(increaseCart)
  .put(decreaseCart)
  .delete(removeProduct);


// router.get("/", getAllProduct);
// router.post("/:productId", increaseCart);
// router.put("/:productId", decreaseCart);
// router.delete("/:productId", removeProduct);

export default router;