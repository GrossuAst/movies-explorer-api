const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const {
  getInfoAboutUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getInfoAboutUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = router;
