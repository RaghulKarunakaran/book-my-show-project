const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const dburl = "mongodb+srv://kraghul1905:YdjjErJzUgSICrJr@cluster0.drdvh.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0";

require('dotenv').config();

app.use(express.json());

mongoose.connect(dburl).then((function() {
    console.log('connected to db');
})).catch(err => console.log(err));

app.use('/api/users', userRoutes);

app.listen(8081, () => {
    console.log("Server is Connected");
})