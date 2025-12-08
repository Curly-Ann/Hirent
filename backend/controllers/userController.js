const userServices = require('../services/userServices');

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};

// CREATE user
const createUser = async (req, res) => {
    try {
        const userData = await userServices.createUser(req.body);
        res.status(201).json(userData);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user.' });
    }
};

module.exports = {
    getAllUsers,
    createUser
};
