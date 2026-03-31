const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  subject: {
    type: String,
    required: true
  },
  lectures: {
    type: Number,
    required: true,
    min: 1
  }
}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);