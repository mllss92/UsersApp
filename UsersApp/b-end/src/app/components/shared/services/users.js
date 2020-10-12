const Users = require('../models/users');

const getUsers = async (pagination) => {
  pagination.collectionSize = await Users.estimatedDocumentCount();

  const startIndex = pagination.pageSize * (pagination.page - 1);
  const data = await Users.find({}, { _id: 0 })
    .skip(startIndex)
    .limit(pagination.pageSize);
  return {
    data: data,
    pagination: pagination
  }
}

module.exports = {
  getUsers
}