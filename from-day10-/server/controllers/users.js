const errorHandler = require("../middleware/errorHandler");
const User = require("../models/Users");

const AvailableUsersforHandoverTickets = async (req, res, next) => {
  try {
    const _user = await User.findById(req.user.id);

    const _users = await User.find({ role: "agent", category: _user.category });

    return res.status(200).json({ users: _users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AvailableUsersforHandoverTickets,
};
