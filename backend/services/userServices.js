const User = require('../models/Users');

const getAllUsers = async () => {
  return await User.find({});
};

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

module.exports = {
  getAllUsers,
  createUser
};
