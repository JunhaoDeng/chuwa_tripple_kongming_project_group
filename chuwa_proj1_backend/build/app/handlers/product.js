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
exports.updateProduct = exports.deleteProduct = exports.getProduct = exports.createProduct = void 0;
var db_1 = require("../database/db");
// POST - /api/users/:id/product
var createProduct = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, description, category, price_cent, quantity, img_link, create_time, update_time, created_by, product, foundUser, foundProduct, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    console.log("in createProduct");
                    _a = req.body, name_1 = _a.name, description = _a.description, category = _a.category, price_cent = _a.price_cent, quantity = _a.quantity, img_link = _a.img_link, create_time = _a.create_time, update_time = _a.update_time;
                    created_by = req.params.id;
                    return [4 /*yield*/, db_1.Product.create({
                            name: name_1,
                            description: description,
                            category: category,
                            price_cent: price_cent,
                            quantity: quantity,
                            img_link: img_link,
                            created_by: created_by,
                            create_time: create_time,
                            update_time: update_time,
                        })];
                case 1:
                    product = _b.sent();
                    return [4 /*yield*/, db_1.Account.findById(req.params.id)];
                case 2:
                    foundUser = _b.sent();
                    // push the message id to the user's messages array
                    foundUser.products.push(product.id);
                    // save the user
                    return [4 /*yield*/, foundUser.save()];
                case 3:
                    // save the user
                    _b.sent();
                    return [4 /*yield*/, db_1.Product.findById(product._id).populate("created_by", {
                            email: true,
                            type: true,
                        })];
                case 4:
                    foundProduct = _b.sent();
                    return [2 /*return*/, res.status(200).json(foundProduct)];
                case 5:
                    err_1 = _b.sent();
                    return [2 /*return*/, next(err_1)];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.createProduct = createProduct;
// GET - /api/users/:id/messages/:product_id
var getProduct = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var product, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.Product.findById(req.params.product_id)];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, res.status(200).json(product)];
                case 2:
                    err_2 = _a.sent();
                    return [2 /*return*/, next(err_2)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getProduct = getProduct;
// DELETE - /api/users/:id/messages/:product_id
var deleteProduct = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var foundProduct, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // find the message by id
                    console.log(req.params);
                    return [4 /*yield*/, db_1.Product.findById(req.params.product_id)];
                case 1:
                    foundProduct = _a.sent();
                    // !! not using findByIdAndRemove because we have the pre remove hook in models/messages.js
                    // remove the message
                    return [4 /*yield*/, foundProduct.deleteOne()];
                case 2:
                    // !! not using findByIdAndRemove because we have the pre remove hook in models/messages.js
                    // remove the message
                    _a.sent();
                    // return a success message
                    return [2 /*return*/, res.status(200).json(foundProduct)];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, next(err_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.deleteProduct = deleteProduct;
// PUT - /api/users/:id/messages/:product_id
var updateProduct = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_2, description, category, price_cent, quantity, img_link, update_time, productId, updatedProduct, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, name_2 = _a.name, description = _a.description, category = _a.category, price_cent = _a.price_cent, quantity = _a.quantity, img_link = _a.img_link, update_time = _a.update_time;
                    productId = req.params.product_id;
                    return [4 /*yield*/, db_1.Product.findByIdAndUpdate(productId, {
                            $set: {
                                name: name_2,
                                description: description,
                                category: category,
                                price_cent: price_cent,
                                quantity: quantity,
                                img_link: img_link,
                                update_time: update_time,
                            },
                        }, { new: true })];
                case 1:
                    updatedProduct = _b.sent();
                    if (!updatedProduct) {
                        return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                    }
                    console.log("updatedProduct", updatedProduct);
                    return [2 /*return*/, res.status(200).json(updatedProduct)];
                case 2:
                    err_4 = _b.sent();
                    return [2 /*return*/, next(err_4)];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateProduct = updateProduct;
