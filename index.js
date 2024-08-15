require("dotenv").config();

// Imports
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./route/user");
const { authenticationHeader } = require("./middleware/authentication");

//variables
const PORT = process.env.PORT;
const app = express();

if (!PORT) throw new Error("PORT not available");

//middleware
app.use(express.json());
app.use(authenticationHeader());

//Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected !"));

//Routes
app.get("/", (req, res) => res.json({ msg: "This is the homepage." }));

app.use("/api/v1/user", userRoutes); //user routes

app.listen(PORT, () => {
  console.log(`App Started on PORT ${PORT}`);
});
