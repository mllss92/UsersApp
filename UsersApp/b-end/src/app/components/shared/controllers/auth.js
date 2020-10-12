const service = require('../services/auth');

const tryLogin = async (req, res) => {
  try {
    const data = await service.tryLogin(req.body);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json('Some server error!')
  }
}


module.exports = {
  tryLogin
}