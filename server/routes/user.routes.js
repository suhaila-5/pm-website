const router = require('express').Router();
const { register, login, getProfile } = require('../controllers/user.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', getProfile);

module.exports = router;