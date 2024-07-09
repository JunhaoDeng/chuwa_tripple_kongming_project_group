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
exports.removeProduct = exports.decreaseCart = exports.increaseCart = exports.getAllProduct = void 0;
var db_1 = require("../database/db");
var getAllProduct = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, cartItems, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.Account.findById(req.params.id).populate({
                            path: 'cart',
                            populate: {
                                path: 'items.product',
                                select: '_id name price_cent img_link'
                            }
                        })];
                case 1:
                    user = _a.sent();
                    if (!user.cart) {
                        res.status(200).json([]);
                    }
                    console.log("User", user.cart);
                    cartItems = user.cart.items.map(function (item) { return ({
                        productId: item.product._id,
                        name: item.product.name,
                        price_cent: item.product.price_cent,
                        img_link: item.product.img_link,
                        quantity: item.quantity
                    }); });
                    console.log({ cartItems: cartItems });
                    res.status(200).json({ cartItems: cartItems });
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, next({
                            status: 400,
                            message: err_1.message
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getAllProduct = getAllProduct;
var increaseCart = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, productId_1, user, cart, cartItem, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    userId = req.params.id;
                    productId_1 = req.params.productId;
                    return [4 /*yield*/, db_1.Account.findById(userId).populate('cart')];
                case 1:
                    user = _a.sent();
                    console.log(user);
                    cart = void 0;
                    if (!!user.cart) return [3 /*break*/, 4];
                    // no cart, create cart
                    cart = new db_1.Cart({
                        product: productId_1,
                        quantity: 1,
                    });
                    return [4 /*yield*/, cart.save()];
                case 2:
                    _a.sent();
                    user.cart = cart._id;
                    return [4 /*yield*/, user.save()];
                case 3:
                    _a.sent();
                    console.log('New cart created and product added successfully');
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, db_1.Cart.findById(user.cart)];
                case 5:
                    // has cart, update it
                    cart = _a.sent();
                    cartItem = cart.items.find(function (item) { return item.product.toString() === productId_1; });
                    if (cartItem) {
                        // has product
                        cartItem.quantity += 1;
                    }
                    else {
                        cart.items.push({ product: productId_1, quantity: 1 });
                    }
                    return [4 /*yield*/, cart.save()];
                case 6:
                    _a.sent();
                    console.log('Cart updated successfully');
                    _a.label = 7;
                case 7: return [2 /*return*/, res.status(200).json(cart)];
                case 8:
                    err_2 = _a.sent();
                    console.error("Failed to update cart");
                    return [2 /*return*/, next(err_2)];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.increaseCart = increaseCart;
var decreaseCart = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, productId_2, user, cart, cartItem, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    userId = req.params.id;
                    productId_2 = req.params.productId;
                    return [4 /*yield*/, db_1.Account.findById(userId).populate('cart')];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, db_1.Cart.findById(user.cart)];
                case 2:
                    cart = _a.sent();
                    cartItem = cart.items.find(function (item) { return item.product.toString() === productId_2; });
                    if (!cartItem) return [3 /*break*/, 4];
                    if (cartItem.quantity > 1) {
                        cartItem.quantity -= 1;
                    }
                    else {
                        cart.items = cart.items.filter(function (item) { return item.product.toString() !== productId_2; });
                    }
                    return [4 /*yield*/, cart.save()];
                case 3:
                    _a.sent();
                    console.log('Product decreasement successfully.');
                    return [3 /*break*/, 5];
                case 4: throw new Error('Product not found in cart');
                case 5: 
                // const updatedCart = Cart.findById(user.cart);
                return [2 /*return*/, res.status(200).json(cart)];
                case 6:
                    err_3 = _a.sent();
                    console.error("Failed to update cart");
                    return [2 /*return*/, next(err_3)];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.decreaseCart = decreaseCart;
var removeProduct = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var productId_3, userId, user, cart, cartItem, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    productId_3 = req.params.productId;
                    userId = req.params.id;
                    return [4 /*yield*/, db_1.Account.findById(userId).populate('cart')];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, db_1.Cart.findById(user.cart)];
                case 2:
                    cart = _a.sent();
                    cartItem = cart.items.find(function (item) { return item.product.toString() === productId_3; });
                    if (!cartItem) return [3 /*break*/, 4];
                    cart.items = cart.items.filter(function (item) { return item.product.toString() !== productId_3; });
                    return [4 /*yield*/, cart.save()];
                case 3:
                    _a.sent();
                    console.log('Product delete successfully.');
                    return [3 /*break*/, 5];
                case 4: throw new Error('Product not found in cart');
                case 5: return [2 /*return*/, res.status(200).json(cart)];
                case 6:
                    err_4 = _a.sent();
                    console.error("Failed to update cart");
                    return [2 /*return*/, next(err_4)];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.removeProduct = removeProduct;
