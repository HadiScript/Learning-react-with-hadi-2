const express = require("express");
const { register, login, currentUser, registerAnyUser } = require("../controllers/auth");
const { verifyToken, isClient, isAgent, AdminAndManager } = require("../middleware/verifying");

const router = express.Router();

// http://localhost:5000/auth/logout

router.post("/signup", register);
router.post("/create-user", registerAnyUser); // admin can create any user

router.post("/signin", login); //

router.get("/current-user", verifyToken, currentUser); // hit check user login?

router.post("/logout", (req, res) => {
  // logout
  req.session = null;
  res.send({ ok: true });
});

module.exports = router;
