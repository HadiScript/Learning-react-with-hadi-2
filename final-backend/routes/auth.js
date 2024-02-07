const express = require("express");
const { register, login, currentUser, registerAnyUser } = require("../controllers/auth");
const { verifyToken, isClient, isAgent, AdminAndManager } = require("../middleware/verifying");

const router = express.Router();

router.post("/signup", register);
router.post("/create-user", registerAnyUser);

router.post("/signin", login);

router.get("/current-user", verifyToken, currentUser);

router.post("/logout", (req, res) => {
  req.session = null;
  res.send({ ok: true });
});

module.exports = router;
