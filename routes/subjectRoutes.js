const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

router.post("/add", async (req, res) => {
  try {
    const { name, userId } = req.body;

    const subject = new Subject({
      name,
      userId,
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