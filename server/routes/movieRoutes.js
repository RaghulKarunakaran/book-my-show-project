const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel");

// add a movie
// get all movies
// update movie
// delete a movie
// fetch a single movie using id

router.post('/add-movie', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({
      success: true,
      message: 'New Movie has been added !'
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
});

router.get('/get-all-movies', async (req, res) => {
  try {
    const allMovies = await Movie.find();
    res.send({
      success: true,
      message: 'All Movies',
      data: allMovies
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
});

router.put('/update-movie', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    const updateMovie = await Movie.findById(req.body.movieId);
    res.send({
      success: true,
      message: 'Movie Updated',
      data: updateMovie
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
});

router.delete('/delete-movie', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    res.send({
      success: true,
      message: 'Movie Deleted'
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
});


router.get('/movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      message: 'All Movies',
      data: movie
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
});

module.exports = router;