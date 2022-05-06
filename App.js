const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

var cookieParser = require("cookie-parser");

const { task } = require("./server/controller/service/cronjob");

env.config();
// console.log(process.env)
//Routes

const AuthRoute = require("./server/route/auth");
const ProductRoute = require("./server/route/product");
const CategoryRoute = require("./server/route/category");
const CareerRoute = require("./server/route/career");
const OrderRoute = require("./server/route/order");
const ServiceRoute = require("./server/route/service");
const UserRoute = require("./server/route/user");
const MailRoute = require("./server/route/template");

// DB
mongoose
  .connect(
    // `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@todo1242021.hehew.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
    process.env.DATABASE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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



app.use("/api", AuthRoute); // /register
app.use("/api", ProductRoute);
app.use("/api", CategoryRoute);
app.use("/api", CareerRoute);
app.use("/api", OrderRoute);
app.use("/api", ServiceRoute);
app.use("/api", UserRoute);
app.use("/api", MailRoute);

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

// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Request-Headers", "POST");
//   res.header("Content-Encoding", "deflate, br");
//   next();
// });

// Cron running ;
task.start();

app.listen(3001, () => {
  console.log("Server is runnign in port 3001");
});
