const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV = 'production', JWT_SECRET = 'ddfc736b97c0621a857e150566eb985c' } = process.env;

// нужно будет добавить централизованную обработку ощибок

const getInfoAboutUser = (req, res, next) => {
  User.findById(req.user._id)
    // .then((user) => res.status(200).send({ data: user }))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      return res.status(200).send({ data: user });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { email: req.body.email, name: req.body.name },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

// регистрация пользователя
// нужно будет добавить хэширование пароля
const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((newUser) => {
          res.status(201).send({ data: newUser });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Такой пользователь уже существует'));
          } else {
            next(err);
          }
        });
    });
};

// авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  // дописать логику авторизации_________________________
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: 'Авторизация успешна' });
    })
    .catch(next);
};

module.exports = {
  getInfoAboutUser,
  updateUserInfo,
  registerUser,
  login,
};
