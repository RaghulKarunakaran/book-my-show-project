const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoute');
const dburl = "mongodb+srv://kraghul1905:YdjjErJzUgSICrJr@cluster0.drdvh.mongodb.net/scaler_practice?retryWrites=true&w=majority&appName=Cluster0";

require('dotenv').config();

app.use(express.json());

mongoose.connect(dburl).then((function() {
    console.log('connected to db');
})).catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);

app.listen(8081, () => {
    console.log("Server is Connected");
})