const express = require("express");
const env = require("dotenv");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
var cookieParser = require("cookie-parser");

env.config();
//Routes

const AuthRoute = require("./server/route/auth");
const ProductRoute = require("./server/route/product");

// DB
mongoose
  .connect(
    // `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@todo1242021.hehew.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
    `mongodb+srv://hdme1995:hdme1995@todo1242021.hehew.mongodb.net/createCompany?retryWrites=true&w=majority`
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
    origin: ["http://localhost:3000"],
  })
);

// Routes middleware
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "build")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use("/api", AuthRoute);
app.use("/api", ProductRoute);

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Request-Headers", "POST");
  next();
});
// App run
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
app.listen(3001, () => {
  console.log("Server is runnign in port 3001");
});
// const auth = router.get('/',)
