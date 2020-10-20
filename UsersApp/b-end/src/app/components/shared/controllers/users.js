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
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getAccessRight = async (req, res) => {
  try {
    const data = await service.getAccessRight(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getInfoAboutUser = async (req, res) => {
  try {
    const data = await service.getInfoAboutUser(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

const getInfoAboutSelf = async (req, res) => {
  try {
    const data = await service.getInfoAboutSelf(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

const editUser = async (req, res) => {
  try {
    const data = await service.editUser(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const data = await service.deleteUser(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error)
  }
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