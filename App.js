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

const BASE_PORT = process.env.NODE_ENV !== "development" ? process.env.PORT : 3001;

// DB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
process.env.NODE_ENV !== "development" && task.start();

app.listen(BASE_PORT, () => {
  console.log(`Server is runnign in port ${BASE_PORT}`);
});
