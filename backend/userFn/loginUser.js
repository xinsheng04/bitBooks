const {users} = require('../users');
const bcrypt = require('bcryptjs');
async function loginUser(req, res){
  const {username, password} = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials.' });
  }
}

module.exports = {loginUser};