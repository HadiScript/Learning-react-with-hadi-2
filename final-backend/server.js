require("dotenv").config();
// require("express-async-errors");
const express = require("express");
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const cors = require("cors");
const corsOptions = require("./config/cors/options");
const connectDB = require("./config/datebase/db");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 5000;

const app = express();
console.log(process.env.NODE_ENV);

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

// app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use("/", express.static(path.join(__dirname, "public")));

connectDB();

// routes

// app.listen(5000)
// http://localhost:5000/auth/signup

// app.use('/auth/signup', (req,res) => {})

app.use("/auth", require("./routes/auth")); // authen
app.use("/category", require("./routes/category")); //cateor
app.use("/ticket", require("./routes/ticket")); //tickets
app.use("/user", require("./routes/users")); // user
app.use("/", require("./routes/root")); // starter //nothing

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});
