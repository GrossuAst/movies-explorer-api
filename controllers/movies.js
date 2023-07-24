const Movie = require('../models/movie');

// так же добавить централизованную обработку ошибок

// возвращает все сохраненные пользователем фильмы
const getAllSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch((err) => { console.log(err); });
};

// создание фильма
const createMovie = (req, res, next) => {
  const {
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    // eslint-disable-next-line max-len
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => { console.log(err); });
};

// удаление фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (movie) {
        return movie.deleteOne().then((ok) => {
          res.status(200).send(ok);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getAllSavedMovies,
  createMovie,
  deleteMovie,
};
