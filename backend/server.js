const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connection = require("./config/connection");
const { connectRedis } = require("./config/redis");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- Middleware ----------------
app.use(express.json());

// ✅ CORS FIX (production-safe)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://study-app-redeployee.vercel.app" // 👈 replace with your real Vercel URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("CORS blocked: Not allowed origin"));
      }
    },
    credentials: true
  })
);

// ---------------- DB Connection ----------------
connection()
  .then(() => console.log(" DB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// ---------------- Redis (optional) ----------------
if (process.env.REDIS_URL) {
  connectRedis();
}

// ---------------- Routes ----------------
app.use("/book", require("./routes/book"));
app.use("/interview", require("./routes/interview"));
app.use("/user", require("./routes/user"));
app.use("/api/interview", require("./routes/QuestionVisit"));
app.use("/quiz", require("./routes/quiz"));
app.use("/", require("./routes/ai.routes"));

// ---------------- Health Check ----------------
app.get("/", (req, res) => {
  res.send(" Backend is running successfully");
});

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});