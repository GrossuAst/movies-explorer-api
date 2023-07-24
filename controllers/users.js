const User = require('../models/user');

// нужно будет добавить централизованную обработку ощибок

const getInfoAboutUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => { console.log(err); });
};

const updateUserInfo = (req, res, next) => {
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
const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;
  User.create({ email, password, name })
    .then((newUser) => {
      res.status(200).send({ data: newUser });
    })
    .catch((err) => {
      console.log(err);
    });
};

// авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  // дописать логику авторизации__________________________
};

module.exports = {
  getInfoAboutUser,
  updateUserInfo,
  registerUser,
  login,
};
