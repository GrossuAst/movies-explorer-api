const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

// const { JWT_SECRET } = process.env.JWT_SECRET;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
