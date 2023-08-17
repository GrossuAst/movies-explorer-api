const router = require('express').Router();

const { updateUserInfoValidation } = require('../utils/validation');

const {
  getInfoAboutUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/users/me', getInfoAboutUser);

router.patch('/users/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
