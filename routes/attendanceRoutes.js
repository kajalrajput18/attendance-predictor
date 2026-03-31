const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// Mark attendance (lecture-wise)
router.post("/mark", async (req, res) => {
  try {
    const { userId, subjectId, attended, total } = req.body;

    const today = new Date().toISOString().split("T")[0];

    // Find existing attendance
    let attendance = await Attendance.findOne({ userId, subjectId });

    if (!attendance) {
      // Create new document
      attendance = new Attendance({
        userId,
        subjectId,
        attendedClasses: attended,
        totalClasses: total,
        records: [
          {
            date: today,
            attended,
            total,
          },
        ],
      });
    } else {
      // Check if today's record already exists
      const existingRecord = attendance.records.find(
        (rec) => rec.date === today
      );

      if (existingRecord) {
        // Update existing record
        attendance.attendedClasses =
          attendance.attendedClasses - existingRecord.attended + attended;

        attendance.totalClasses =
          attendance.totalClasses - existingRecord.total + total;

        existingRecord.attended = attended;
        existingRecord.total = total;
      } else {
        // Add new record
        attendance.records.push({
          date: today,
          attended,
          total,
        });

        attendance.attendedClasses += attended;
        attendance.totalClasses += total;
      }
    }

    await attendance.save();

    res.status(200).json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;