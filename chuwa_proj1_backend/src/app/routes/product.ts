import express = require("express");
const router = express.Router({ mergeParams: true });
import { createProduct } from "../handlers/product";

// prefix - /api/users/:id/messages
router.route("/").post(createProduct);

// prefix - /api/users/:id/messages/:message_id
// router.route("/:message_id").get(getMessage).delete(deleteMessage);

export default router;
