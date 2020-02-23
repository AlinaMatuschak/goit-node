const express = require("express");
const app = express();
const logger = require("morgan");
const { port, mode } = require("./config/config");
const userRouter = require("./auth/auth.router");
const dbConnection = require("./db/dbConenction");
dbConnection();

if (mode === "production") logger("dev");

app.use(express.json());

app.use("/auth", userRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
