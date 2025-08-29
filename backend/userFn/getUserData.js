const { getUserData } = require('../users');

function findUser(req, res){
  const username = req.query.username;
  return res.status(200).json(getUserData(username));
}

module.exports = {findUser};