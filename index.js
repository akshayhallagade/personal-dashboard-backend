require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./route/user");

const PORT = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected !"));

app.get("/", (req, res) => res.json({ msg: "Ok" }));

app.use("/api/v1/user", userRoutes); //user routes

app.listen(PORT, () => {
  console.log(`App Started on PORT ${PORT}`);
});
