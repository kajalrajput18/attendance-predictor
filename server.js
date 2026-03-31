require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();
const app = express();
const userRoutes = require("./routes/userRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/attendance", attendanceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/test", (req, res) => {
  res.json({ message: "Test API is working 🚀" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});