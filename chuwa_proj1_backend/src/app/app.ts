import express = require("express");
import { connect_db } from "./database/db";
import authRoutes from "./routes/auth";
require("dotenv").config({ path: ".env" });

const app: express.Application = express();

app.use(express.json()); // 确保你能够解析 JSON 请求体

console.log("connecting to db");
connect_db();
console.log("connected to db");

app.get("/", (req, res) => {
  res.send("Hello World!21321dsfsd");
});

app.use("/api/auth", authRoutes); // 使用路由

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
