const express = require("express");
const { verifyToken, AdminAndManager } = require("../middleware/verifying");
const { create, deleteCategory, allCategories } = require("../controllers/categories");

const router = express.Router();

// base -> http://localhost:5000/category/create  post
// base -> http://localhost:5000/category/remove/id

router.post("/create", verifyToken, AdminAndManager, create);
router.delete("/remove/:_id", verifyToken, AdminAndManager, deleteCategory);

router.get("/", allCategories);

module.exports = router;
