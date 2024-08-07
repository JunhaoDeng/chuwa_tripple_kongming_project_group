"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import express from "express";
var router = express.Router();
var auth_1 = require("../handlers/auth");
// console.log("auth.ts");
router.post("/signup", auth_1.signup);
router.post("/signin", auth_1.signin);
exports.default = router;
