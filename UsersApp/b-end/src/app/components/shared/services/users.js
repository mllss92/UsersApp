const bcrypt = require('bcryptjs');

const Users = require('../models/users');

const getUsers = async (pagination) => {
  pagination.collectionSize = await Users.estimatedDocumentCount() - 1;

  const startIndex = pagination.pageSize * (pagination.page - 1);
  const data = await Users.find({ isAdmin: { $ne: true } }, { _id: 0, __v: 0, email: 0, password: 0, isAdmin: 0 })
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

const getAccessRight = async (userId) => {
  const accessRight = await Users.findOne({ id: userId }).select('userRights');
  return accessRight.userRights
}

const getInfoAboutUser = async (userId) => {
  return await Users.findOne({ id: userId }, { __v: 0, password: 0 });
}

const getInfoAboutSelf = async (userId) => {
  return await Users.findOne({ id: userId }, { __v: 0, password: 0 });
}

const editUser = async (user) => {
  user.updated_at = Date.now();
  return await Users.findOneAndUpdate({ id: user.id }, user, { new: true }).select('name email userRights');
}

const editSelf = async (userId, userData) => {
  const user = userData.user;
  for (const key in user) {
    if (user.hasOwnProperty(key)) {
      if (user[key] === '' || user[key] === undefined || !user[key]) {
        delete user[key]
      }
    }
  }

  if (userData.oldPassword && user.password) {
    const userFromDb = await Users.findOne({ id: userId });
    const isSame = bcrypt.compareSync(userData.oldPassword, userFromDb.password);
    if (!isSame) {
      return Promise.reject({ message: 'Old password is incorrect!' });
    } else {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt)
    }
  }

  if (user.name) {
    user.name = user.name[0].toUpperCase() + user.name.toLowerCase().slice(1);
  }
  user.updated_at = Date.now();

  return Users.findOneAndUpdate({ id: userId }, user).exec()
    .then(res => {
      if (res) {
        const { name, email } = user;
        return { name: name, email: email }
      }
    })
    .catch(err => err)
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
  editSelf,
  deleteUser
}