const validateUser = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username.' });
    }

    next();
};

module.exports = {
    validateUser
};
