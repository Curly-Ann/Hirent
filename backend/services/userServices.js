import User from '../models/Users';

const getAllUsers = async () => {
  return await User.find({});
}

const createUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
}

export default { getAllUsers, createUser };