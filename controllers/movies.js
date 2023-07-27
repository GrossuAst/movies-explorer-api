const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden');

// возвращает все сохраненные пользователем фильмы
const getAllSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

// создание фильма
const createMovie = (req, res, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailerLink, movieId, nameRU, nameEN, thumbnail, owner,
  })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch(next);
};

// удаление фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такой фильм не сохранен');
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError('Вы не можете удалить этот фильм');
      }
      return Movie.deleteOne()
        .then(() => {
          res.status(200).send({ message: 'Фильм удален' });
        });
    })
    .catch(next);
};

module.exports = {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
};
