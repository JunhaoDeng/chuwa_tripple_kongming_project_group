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
exports.signin = exports.signup = void 0;
var db_1 = require("../database/db");
// import jwt from "jsonwebtoken";
var jwt = require("jsonwebtoken");
// import { sign } from "jsonwebtoken";
require("dotenv").config({ path: ".env" });
var signup = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var account, id, email, cart, token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    console.log("req.body", req.body);
                    console.log("req.body id:", req.body.id);
                    console.log("req.body email:", req.body.email);
                    console.log("req.body enc_password:", req.body.enc_password);
                    console.log("req.body type:", req.body.type);
                    return [4 /*yield*/, db_1.Account.create(req.body)];
                case 1:
                    account = _a.sent();
                    console.log("account", account);
                    id = account.id, email = account.email;
                    console.log("id", id);
                    console.log("email", email);
                    return [4 /*yield*/, db_1.Cart.create({
                            items: [],
                            zip_code: req.body.zip_code || "",
                            discount_cent: req.body.discount_cent || 0,
                            estimated_total_cent: req.body.estimated_total_cent,
                        })];
                case 2:
                    cart = _a.sent();
                    console.log("cart", cart);
                    account.cart = cart._id;
                    return [4 /*yield*/, account.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, jwt.sign({
                            id: id,
                            email: email,
                        }, process.env.JWT_SECRET_KEY)];
                case 4:
                    token = _a.sent();
                    console.log("token", token);
                    return [2 /*return*/, res.status(200).json({
                            id: id,
                            email: email,
                            token: token,
                        })];
                case 5:
                    err_1 = _a.sent();
                    // see what kind of error
                    // if it is a certain error
                    // responde with username/email already taken
                    // otherwise just send back with 400
                    // if there is already a user with that email
                    if (err_1.code === 11000) {
                        err_1.message = "Sorry, that username and/or email is taken";
                    }
                    console.log("err", err_1);
                    return [2 /*return*/, next({
                            status: 400,
                            message: err_1.message,
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.signup = signup;
var signin = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, id, email, isMatch, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, db_1.Account.findOne({
                            email: req.body.email,
                        })];
                case 1:
                    user = _a.sent();
                    console.log("user", user);
                    id = user.id, email = user.email;
                    console.log("id", id);
                    console.log("email", email);
                    console.log("req.body.password", req.body.enc_password);
                    return [4 /*yield*/, user.comparePassword(req.body.enc_password)];
                case 2:
                    isMatch = _a.sent();
                    console.log("isMatch", isMatch);
                    // if it all matches, log them in
                    if (isMatch) {
                        token = jwt.sign({
                            id: id,
                            email: email,
                        }, process.env.JWT_SECRET_KEY);
                        return [2 /*return*/, res.status(200).json({
                                id: id,
                                email: email,
                                token: token,
                            })];
                    }
                    else {
                        return [2 /*return*/, next({
                                status: 400,
                                message: "Invalid Email / Password.",
                            })];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, next({
                            status: 400,
                            message: "Invalid Email / Password.",
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.signin = signin;
