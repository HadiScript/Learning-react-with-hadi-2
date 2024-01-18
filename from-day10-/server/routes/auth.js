const express = require("express");
const { register, login, signOut, currentUser, registerAnyUser } = require("../controllers/auth");
const { verifyToken, isAgent, AdminAndManager, isClient } = require("../middleware/verifying");

const router = express.Router();

router.post("/signup", register);
router.post("/create-user", registerAnyUser);
router.post("/signin", login);
router.get("/signout", signOut);

router.get("/current-user", verifyToken, currentUser);
router.get("/current-agent", verifyToken, isAgent, currentUser);
router.get("/current-admin", verifyToken, AdminAndManager, currentUser);
router.get("/current-client", verifyToken, isClient, currentUser);

module.exports = router;
