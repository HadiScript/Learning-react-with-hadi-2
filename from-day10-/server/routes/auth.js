const express = require("express");
const { register, login, signOut, currentUser, registerAnyUser } = require("../controllers/auth");
const { verifyToken } = require("../middleware/verifying");

const router = express.Router();

router.post("/signup", register);
router.post("/create-user", registerAnyUser);
router.post("/signin", login);
router.get("/signout", signOut);

router.get("/current-user", verifyToken, currentUser);

module.exports = router;
