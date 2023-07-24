const router = require('express').Router();

const {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getAllSavedMovies);

router.post('/movies', createMovie);

// проверить позже, правильный ли путь :movieId
router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
