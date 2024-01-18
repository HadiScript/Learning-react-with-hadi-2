const express = require("express");
const { verifyToken, AdminAndManager } = require("../middleware/verifying");
const { create, deleteCategory, allCategories } = require("../controllers/categories");

const router = express.Router();

router.post("/create", verifyToken, AdminAndManager, create);
router.delete("/remove/:_id", verifyToken, AdminAndManager, deleteCategory);

router.get("/", allCategories);

module.exports = router;
