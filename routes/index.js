const router = require('express').Router();

const loginRouter = require('./login');
const registerRouter = require('./register');
const auth = require('../middlewares/auth');
const logoutRouter = require('./logout');
const userRouter = require('./users');
const movieRouter = require('./movies');
const nonExistenRoutes = require('./non-existen-routes');

router.use(loginRouter);
router.use(registerRouter);
router.use(auth);
router.use(logoutRouter);
router.use(userRouter);
router.use(movieRouter);
router.use(nonExistenRoutes);

module.exports = router;
