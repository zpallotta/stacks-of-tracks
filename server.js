const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://zpallotta:xOgAidkOrpMPzTKU@ztp5.dhjk3bj.mongodb.net/NoSQL2022");

app.use("/", require("./routes/trackRoute"));

app.listen(3001, function() {
    console.log("Express server is running on port 3001");
})
