"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("./database/db");
var auth_1 = require("./routes/auth");
var app = express();
app.use(express.json()); // 确保你能够解析 JSON 请求体
app.use("/api/auth", auth_1.default); // 使用路由
console.log("connecting to db");
(0, db_1.connect_db)();
console.log("connected to db");
app.get("/", function (req, res) {
    res.send("Hello World!21321dsfsd");
});
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});
