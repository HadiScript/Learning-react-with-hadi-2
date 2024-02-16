const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // const {data} = await axios.post(url, {} )
  // const {data} = await axios.post(url, {} )

  if (!name || !email || !password) {
    return next(errorHandler(400, "User not found!"));
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return next(errorHandler(400, "You already registered"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  let user = await newUser.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  const user2 = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  req.session = {
    token,
  };

  res.status(201).json({ user: user2 });
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

    const user = {
      name: rest.name,
      email: rest.email,
      role: rest.role,
    };

    req.session = {
      token,
    };

    // console.log("token", token, res.session);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const _user = await User.findOne({ _id: req.user.id });

    let user = {
      name: _user.name,
      email: _user.email,
      role: _user.role,
      _id : _user._id
    };
    res.status(201).json({ msg: "hi", user });    
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

  currentUser,
  registerAnyUser,
};
