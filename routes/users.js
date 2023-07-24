const router = require('express').Router();

const {
  getInfoAboutUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getInfoAboutUser);

router.patch('/users/me', updateUserInfo);

module.exports = router;
