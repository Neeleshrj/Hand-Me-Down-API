const express = require("express");
require("dotenv").config("./env");

const auth = require("./routes/auth");
const postTask = require('./routes/tasks');
const userInfo = require("./routes/user");

const mongoose = require("mongoose");
const app=express();


if (!process.env.jwtPrivateKey) {
  console.log("ERROR: jwtKey not defined");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB."))
  .catch((err) => console.error(err));

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/userInfo', userInfo)
app.use('/api/tasks', postTask);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`port ${port}`));