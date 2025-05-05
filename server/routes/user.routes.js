const router = require('express').Router();
const { register, login, getProfile } = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', getProfile);
router.get('/me', auth, async(req, res) => {
    try {
        const user = {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
        };
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;