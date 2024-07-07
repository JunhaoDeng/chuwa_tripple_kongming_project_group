import { Account } from "../database/db";
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
// import { sign } from "jsonwebtoken";
require("dotenv").config({ path: ".env" });

export const signup = async function (req, res, next) {
  try {
    console.log("req.body", req.body);
    console.log("req.body id:", req.body.id);
    console.log("req.body email:", req.body.email);
    console.log("req.body enc_password:", req.body.enc_password);
    console.log("req.body type:", req.body.type);
    let account = await Account.create(req.body);
    console.log("account", account);
    let { id, email } = account;
    console.log("id", id);
    console.log("email", email);
    let token = await jwt.sign(
      {
        id,
        email,
      },
      process.env.JWT_SECRET_KEY
    );
    console.log("token", token);
    return res.status(200).json({
      id,
      email,
      token,
    });
  } catch (err) {
    // see what kind of error
    // if it is a certain error
    // responde with username/email already taken
    // otherwise just send back with 400

    // if there is already a user with that email
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    console.log("err", err);
    return next({
      status: 400,
      message: err.message,
    });
  }
};

export const signin = async function (req, res, next) {
  try {
    // finding a user
    const user = await Account.findOne({
      email: req.body.email,
    });
    console.log("user", user);
    const { id, email } = user;
    console.log("id", id);
    console.log("email", email);
    console.log("req.body.password", req.body.enc_password);

    // checking if their password matches what was sent to the server
    const isMatch = await user.comparePassword(req.body.enc_password);
    console.log("isMatch", isMatch);
    // if it all matches, log them in
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          email,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.status(200).json({
        id,
        email,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email / Password.",
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid Email / Password.",
    });
  }
};
