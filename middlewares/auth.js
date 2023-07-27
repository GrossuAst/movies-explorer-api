const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'ddfc736b97c0621a857e150566eb985c' } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.log(err);
    return;
  }
  req.user = payload;
  next();
};
