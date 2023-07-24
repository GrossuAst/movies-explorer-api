// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    // eslint-disable-next-line max-len
    // возможна неверная настройка. Разобраться, что значит "id фильма, который содержится в ответе сервиса MoviesExplorer"
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    match: /^[А-Яа-яЁё ]+$/,
    message: 'Это поле может содержать только кириллические символы',
  },
  nameEN: {
    type: String,
    required: true,
    // проверить работу валидации_______
    match: /^[A-Za-z ]+$/,
    message: 'Это поле может содержать только латинские символы',
  },
});

module.exports = mongoose.model('movie', movieSchema);
