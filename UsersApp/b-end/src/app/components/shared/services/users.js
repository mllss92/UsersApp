const bcrypt = require('bcryptjs');

const Users = require('../models/users');

const getUsers = async (pagination) => {
  pagination.collectionSize = await Users.estimatedDocumentCount() - 1;

  const startIndex = pagination.pageSize * (pagination.page - 1);
  const data = await Users.find({ name: { $ne: 'Admin' } }, { _id: 0, __v: 0, email: 0, password: 0, isAdmin: 0 })
    .sort('name')
    .skip(startIndex)
    .limit(pagination.pageSize);
  return {
    data: data,
    pagination: pagination
  }
}

const createUser = async (user) => {
  const isAlreadyExist = await Users.findOne({ email: user.email });
  if (isAlreadyExist) {
    return Promise.reject({ message: 'User with this email address already exists!' });
  } else if (user.name.toLowerCase().includes('admin')) {
    return Promise.reject({ message: 'Incorrect name!' });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = user.password;

    user.name = user.name[0].toUpperCase() + user.name.toLowerCase().slice(1);
    user.password = bcrypt.hashSync(password, salt);

    return Users.create(user)
      .then(newUser => newUser)
  }
}

const getAccessRight = async (user) => {
  const accessRight = await Users.findOne({ email: user.email }, { _id: 0 }).select('isAdmin');
  return accessRight.isAdmin
}

const getInfoAboutUser = async (userId) => {
  return await Users.findOne({ id: userId }, { __v: 0, _id: 0, password: 0 });
}

const getInfoAboutSelf = async (data) => {
  return await Users.findOne({ email: data.email }, { __v: 0, password: 0 });
}

const editUser = async (user) => {
  const newUser = await Users.findOneAndUpdate({ id: user.id }, { name: user.name, updated_at: Date.now() });
  if (!newUser) {
    return Promise.reject('User not found!');
  }
  return true
}

const deleteUser = async (userId) => {
  const deletedUser = await Users.findOneAndDelete({ id: userId });
  if (!deletedUser) {
    return Promise.reject('User not found!');
  }
  return true
}

module.exports = {
  getUsers,
  createUser,
  getAccessRight,
  getInfoAboutUser,
  getInfoAboutSelf,
  editUser,
  deleteUser
}