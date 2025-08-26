import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/du_csas";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// 🔹 Schema & Model
const studentSchema = new mongoose.Schema({
  applicationId: String,
  dob: String,
  name: String,
  course: String,
  allottedCollege: String,
  contact: String,
  paymentHistory: [
    {
      amount: Number,
      date: String,
      time: String,
      txnId: String,
      mode: String
    }
  ]
});

const Student = mongoose.model("Student", studentSchema);

// 🔹 Seed Data (Run once)
app.get("/seed", async (req, res) => {
  await Student.deleteMany({});
  const student = new Student({
    applicationId: "253511135831",
    dob: "10/10/2006",
    name: "Siddhi Singh",
    course: "BA Political Science",
    allottedCollege: "Lady Shri Ram College",
    contact: "9102861614",
    paymentHistory: [
      {
        amount: 20400,
        date: "31/07/2025",
        time: "04:35 PM",
        txnId: "556113929872",
        mode: "UPI"
      }
    ]
  });
  await student.save();
  res.send("✅ Seeded student data!");
});

// 🔹 Login route
app.post("/login", async (req, res) => {
  const { applicationId, password } = req.body;
  if (applicationId === "admin1" && password === "adminpass") {
    return res.json({ role: "admin" });
  }

  const student = await Student.findOne({ applicationId });
  if (student && password === "Siddhi@07") {
    return res.json({ role: "student", student });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
