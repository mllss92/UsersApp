const service = require('../services/users');

const getUsers = async (req, res) => {
  try {
    const data = await service.getUsers(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Some server error');
  }
}

const createUser = async (req, res) => {
  try {
    const data = await service.createUser(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json('Some server error');
  }
}

module.exports = {
  getUsers,
  createUser
}