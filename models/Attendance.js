const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  attendedClasses: {
    type: Number,
    default: 0,
  },
  totalClasses: {
    type: Number,
    default: 0,
  },
  records: [
    {
      date: {
        type: String,
      },
      attended: {
        type: Number, 
      },
      total: {
        type: Number, 
      },
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);