const express = require("express");
const app = express();
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
app.set('trust proxy', 1);

const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoute');
const showRoutes = require('./routes/showRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const dburl = "mongodb+srv://kraghul1905:YdjjErJzUgSICrJr@cluster0.drdvh.mongodb.net/scaler_practice?retryWrites=true&w=majority&appName=Cluster0";

require('dotenv').config();

app.use(express.json());

// Global limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  handler: (req, res) => {
    res.status(429).send({
      success: false,
      message: "Too many requests. Please try again later."
    });
  }
});
app.use(generalLimiter);

mongoose.connect(dburl).then((function() {
    console.log('connected to db');
})).catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(8081, () => {
    console.log("Server is Connected");
})