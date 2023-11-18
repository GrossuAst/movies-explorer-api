const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden');

const { statusCreated, noContentStatus } = require('../utils/constants');

// возвращает все сохраненные пользователем фильмы
const getAllSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// создание фильма
const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country, director, duration, year, description, image, trailerLink, movieId, nameRU, nameEN, thumbnail, owner,
  })
    .then((movie) => {
      res.status(statusCreated).send({ data: movie });
    })
    .catch(next);
};

// удаление фильма
const deleteMovie = (req, res, next) => {
  // Movie.findOne({ movieId: req.params.movieId })
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такой карточки не существует');
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалить эту карточку');
      }
      // return Movie.deleteOne({ movieId: req.params._id })
      return movie.deleteOne()
        .then((ok) => {
          res.status(noContentStatus).send({ message: 'Карточка удалена' });
        });
    })
    .catch(next);
};

module.exports = {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
};
