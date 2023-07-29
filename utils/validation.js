const { celebrate, Joi } = require('celebrate');

const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

// валидация создания карточки
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regex),
    trailerLink: Joi.string().required().pattern(regex),
    thumbnail: Joi.string().required().pattern(regex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(/^[А-Яа-яЁё ]+$/),
    nameEN: Joi.string().required().pattern(/^[A-Za-z ]+$/),
  }),
});

// валидация _id удаляемой карточки
const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

// валидация обновления данных профиля
const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// валидациия регистрации пользователя
const registerUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
    password: Joi.string().required().min(5),
  }),
});

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
  updateUserInfoValidation,
  registerUserValidation,
};
