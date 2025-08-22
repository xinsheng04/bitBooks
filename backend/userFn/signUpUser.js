const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserData } = require('../users');
const { users, addUser } = require('../users');

async function signUpUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Both username and password are required." });
  }
  if (users.some(u => u.username === username)) {
    return res.status(400).json({ message: "Username already exists." });
  }
  try {
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    res.status(201).json({ message: "User registered successfully." });
    const payload = addUser(username, hashedPw);
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res.status(200).json({ accessToken, message: 'Sign up successful!' });

  } catch (e) {
    // Handle any errors during hashing
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = { signUpUser };