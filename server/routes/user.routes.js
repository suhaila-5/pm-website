const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id', getProfile);
router.get('/me', auth, async(req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email']
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;