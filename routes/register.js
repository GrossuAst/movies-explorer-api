const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { registerUser } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
    password: Joi.string().required().min(5),
  }),
}), registerUser);

module.exports = router;
