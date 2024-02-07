const express = require("express");
const { verifyToken, isAgent } = require("../middleware/verifying");
const { AvailableUsersforHandoverTickets } = require("../controllers/users");
const User = require("../models/Users");
const router = express.Router();

router.get("/available-for-handover", verifyToken, isAgent, AvailableUsersforHandoverTickets);



// just for check, not for production
router.get("/all-users", async (req, res, next) => {
  try {
    console.log("touched");
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    // next(error);
  }
});


module.exports = router;
