const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const User = require("../models/Users");

const verifyToken = (req, res, next) => {
  const token = req.headers.cookies;

  console.log(req.headers.cookies, "here is token of mine");

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    console.log(user);
    req.user = user;
    next();
  });
};

// users

const isAdmin = async (req, res, cb) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return cb(errorHandler(401, "Not allowed"));
    } else {
      cb();
    }
  } catch (err) {
    console.log(err);
  }
};

const AdminAndManager = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    switch (user.role) {
      case "admin":
        next();
        break;
      case "manager":
        next();
        break;
      default:
        return next(errorHandler(401, "Not allowed"));
    }
  } catch (err) {
    console.log(err);
  }
};

const isAgent = async (req, res, cb) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "agent") {
      return cb(errorHandler(401, "Not allowed"));
    } else {
      cb();
    }
  } catch (err) {
    console.log(err);
  }
};

const isManager = async (req, res, cb) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "manager") {
      return cb(errorHandler(401, "Not allowed"));
    } else {
      cb();
    }
  } catch (err) {
    console.log(err);
  }
};

const HandoverRights = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    switch (user.role) {
      case "admin":
        next();
        break;
      case "manager":
        next();
        break;
      case "agent":
        next();
        break;
      default:
        return next(errorHandler(401, "Not allowed"));
    }
  } catch (err) {
    console.log(err);
  }
};

const isClient = async (req, res, cb) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== "client") {
      return cb(errorHandler(401, "Not allowed"));
    } else {
      cb();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  AdminAndManager,
  isAgent,
  isManager,
  HandoverRights,
  isClient,
};
