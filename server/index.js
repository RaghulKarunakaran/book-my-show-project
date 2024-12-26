const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dburl = "mongodb+srv://kraghul1905:YdjjErJzUgSICrJr@cluster0.drdvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(dburl).then((function() {
    console.log('connected to db');
})).catch(err => console.log(err));

app.listen(8081, () => {
    console.log("Server is Connected");
})