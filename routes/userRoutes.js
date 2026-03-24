const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user,
  });
});
module.exports = router;