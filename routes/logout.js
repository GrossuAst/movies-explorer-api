const router = require('express').Router();

router.get('/signout', (req, res) => { res.status(200).clearCookie('jwt').send({ message: 'Cookie-данные удалены' }); });

module.exports = router;
