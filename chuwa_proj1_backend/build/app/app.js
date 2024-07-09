"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var db_1 = require("./database/db");
var auth_1 = require("./routes/auth");
var cart_1 = require("./routes/cart");
// require("dotenv").config({ path: ".env" });
var auth_2 = require("./middleware/auth");
var product_1 = require("./routes/product");
var app = express();
var PORT = 3000;
// middleware
app.use(express.json()); // 确保你能够解析 JSON 请求体
app.use(express.urlencoded({ extended: false }));
app.use(cors());
console.log("connecting to db");
(0, db_1.connect_db)();
console.log("connected to db");
app.get("/", function (req, res) {
    res.send("Hello World!21321dsfsd");
});
app.use("/api/auth", auth_1.default); // 使用路由
app.use("/api/users/:id/cart", auth_2.loginRequired, auth_2.ensureCorrectUser, cart_1.default);
app.use("/api/users/:id/product", auth_2.loginRequired, auth_2.ensureCorrectUser, product_1.default);
app.get("/api/products", auth_2.loginRequired, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var messages, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log("in get products");
                    return [4 /*yield*/, db_1.Product.find()
                            .sort({ createdAt: "desc" })
                            .populate("created_by", {
                            email: true,
                            type: true,
                        })];
                case 1:
                    messages = _a.sent();
                    return [2 /*return*/, res.status(200).json(messages)];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, next(err_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.listen(3000, function () {
    console.log(app._router.stack);
    console.log("Example app listening on port 3000!");
});
