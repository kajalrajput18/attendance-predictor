const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
const protect = require("../middleware/authMiddleware");
router.post("/add",protect, async (req, res) => {
  try {
    const { name } = req.body;
    const subject = new Subject({
      name,
      userId: req.user,
    });

    await subject.save();

    res.status(201).json({
      message: "Subject added successfully",
      subject,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;