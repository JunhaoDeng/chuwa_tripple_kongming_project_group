import express = require("express");
const router = express.Router();
import { signup, signin } from "../handlers/auth";

// console.log("auth.ts");

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
