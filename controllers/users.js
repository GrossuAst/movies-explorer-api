const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV = 'production', JWT_SECRET = 'ddfc736b97c0621a857e150566eb985c' } = process.env;

// нужно будет добавить централизованную обработку ощибок

const getInfoAboutUser = (req, res) => {
  // нужно будет написать мидлвэру, добавляющая запросу поле user, счс работает через req.params._id
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => { console.log(err); });
};

const updateUserInfo = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { email: req.body.email, name: req.body.name },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => { console.log(err); });
};

// регистрация пользователя
// нужно будет добавить хэширование пароля
const registerUser = (req, res) => {
  const { email, password, name } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then((newUser) => {
          res.status(200).send({ data: newUser });
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

// авторизация пользователя
const login = (req, res) => {
  const { email, password } = req.body;
  // дописать логику авторизации_________________________
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(200).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ message: 'Авторизация успешна' });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getInfoAboutUser,
  updateUserInfo,
  registerUser,
  login,
};
