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

module.exports = {
  getInfoAboutUser,
  updateUserInfo,
};
