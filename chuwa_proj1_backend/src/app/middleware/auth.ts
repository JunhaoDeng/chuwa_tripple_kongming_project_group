const jwt = require("jsonwebtoken");

// make sure the user is logged in - Authentication
export const loginRequired = async function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer token
    console.log("token", token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded", decoded);
    if (decoded) {
      return next();
    } else {
      return next({
        status: 401,
        message: "Please log in first",
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Please log in first",
    });
  }
};

// make sure we get the correct user - Authorization
export const ensureCorrectUser = async function (req, res, next) {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; // Bearer token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded && decoded.id === req.params.id) {
      return next();
    } else {
      return next({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized",
    });
  }
};
