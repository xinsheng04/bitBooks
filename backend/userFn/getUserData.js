const { getUserData } = require('../users');

function findUser(req, res){
  const username = req.query.username;
  return getUserData(username);
}

module.exports = {findUser};