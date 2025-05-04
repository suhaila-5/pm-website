const DataHandler = require('../utils/dataHandler');
const userHandler = new DataHandler('users.json');

const register = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = await userHandler.readData() || { users: [] };

        // Check if user exists
        if (data.users.some(user => user.email === email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        };

        data.users.push(newUser);
        await userHandler.writeData(data);
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const data = await userHandler.readData();
        const user = data.users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const data = await userHandler.readData();
        const user = data.users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login, getProfile };