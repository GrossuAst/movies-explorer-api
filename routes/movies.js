const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getAllSavedMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailerLink: Joi.string().required().pattern(regex),
    thumbnail: Joi.string().required().pattern(regex),
    // owner: Joi.string().required().hex(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(/^[А-Яа-яЁё ]+$/),
    nameEN: Joi.string().required().pattern(/^[A-Za-z ]+$/),
  }),
}), createMovie);

// проверить позже, правильный ли путь :movieId
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
