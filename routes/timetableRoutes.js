const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/add", authMiddleware,async (req, res) => {
  try {
    const { day, subject, lectures } = req.body;
    const newEntry = new Timetable({
      userId: req.user,
      day,
      subject,
      lectures
    });

    const saved = await newEntry.save();

    res.status(201).json({
      message: "Timetable added successfully",
      data: saved
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const timetable = await Timetable.find({
      userId: req.user
    });

    res.status(200).json(timetable);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/today", authMiddleware, async (req, res) => {
  try {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[new Date().getDay()];

    const timetable = await Timetable.find({
      userId: req.user.id,
      day: today
    });

    res.status(200).json({
      today,
      timetable
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;