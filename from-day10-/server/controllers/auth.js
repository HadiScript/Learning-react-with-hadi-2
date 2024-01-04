const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(errorHandler(400, "User not found!"));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(errorHandler(400, "You already registered"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ msg: "User created successfully!" });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }).populate("category");
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    // its just for postman
    // res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);

    let redirectTo = rest.role === "manager" ? "manager" : rest.role === "client" ? "client" : rest.role === "admin" ? "admin" : "agent";

    res.status(200).json({ token, redirectTo, rest });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const _user = await User.findOne({ _id: req.user.id });
    res.status(201).json({ msg: "hi", _user });
  } catch (error) {
    next(error);
  }
};

const registerAnyUser = async (req, res, next) => {
  const { name, email, password, category, role } = req.body;

  if (!name || !email || !password || !role) {
    return next(errorHandler(400, "All fields are requried"));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(errorHandler(400, "User already registered"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const userPayload = { name, email, password: hashedPassword, role };
  if (role === "agent") {
    if (category) {
      userPayload.category = category;
    }
  }

  const newUser = new User(userPayload);

  await newUser.save();
  res.status(201).json({ msg: "User created successfully!" });
};

module.exports = {
  register,
  login,
  signOut,
  currentUser,
  registerAnyUser,
};
