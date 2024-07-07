import express = require("express");
import { Product, connect_db } from "./database/db";
import authRoutes from "./routes/auth";
// require("dotenv").config({ path: ".env" });
import { loginRequired, ensureCorrectUser } from "./middleware/auth";
import productRoutes from "./routes/product";

const app: express.Application = express();

app.use(express.json()); // 确保你能够解析 JSON 请求体

console.log("connecting to db");
connect_db();
console.log("connected to db");

app.get("/", (req, res) => {
  res.send("Hello World!21321dsfsd");
});

app.use("/api/auth", authRoutes); // 使用路由
app.use(
  "/api/users/:id/product",
  loginRequired,
  ensureCorrectUser,
  productRoutes
);

app.get("/api/products", loginRequired, async function (req, res, next) {
  try {
    console.log("in get products");
    const messages = await Product.find()
      .sort({ createdAt: "desc" })
      .populate("created_by", {
        email: true,
        type: true,
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
