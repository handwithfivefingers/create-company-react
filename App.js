const express = require("express");

const env = require("dotenv");

const app = express();

const path = require("path");

const mongoose = require("mongoose");

const cors = require("cors");

const AppRouter = require("./server/route");

var cookieParser = require("cookie-parser");

const { task } = require("./server/controller/service/cronjob");

env.config();

// DB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

// middleware

app.use(express.json());
app.use(cookieParser());

//config cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://app.thanhlapcongtyonline.vn"],
  })
);

global.__basedir = __dirname;

// Routes middleware

app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "build")));

app.use("/api", AppRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Handling 500
app.use((err, req, res, next) => {
  res.status(500).send({
    error: err.stack,
    message: "Internal Server Error",
  });
});

// Cron running ;
// task.start();

app.listen(3001, () => {
  console.log("Server is runnign in port 3001");
});
