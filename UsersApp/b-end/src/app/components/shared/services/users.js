const Users = require('../models/users');

const getUsers = async (pagination) => {
  pagination.collectionSize = await Users.estimatedDocumentCount();

  const startIndex = pagination.pageSize * (pagination.page - 1);
  const data = await Users.find({}, { _id: 0 })
    .sort('name')
    .skip(startIndex)
    .limit(pagination.pageSize);
  return {
    data: data,
    pagination: pagination
  }
}

const createUser = async (user) => {
  user.created_at = new Date();

  const data = await Users.create(user)
    .then(result => result);
  const { name, email, created_at } = data;
  return {
    name,
    email,
    created_at
  }

}

module.exports = {
  getUsers,
  createUser
}