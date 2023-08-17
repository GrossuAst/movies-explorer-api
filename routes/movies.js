const router = require('express').Router();

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/validation');

const {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getAllSavedMovies);

router.post('/movies', createMovieValidation, createMovie);

router.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
