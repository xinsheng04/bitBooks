const jwt = require('jsonwebtoken');
const {getBooks} = require('../library');
const bcrypt = require('bcryptjs');
const {getUserData} = require('../users');
const {getUserPassword} = require('../users');


async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  
  try {
    // 1. Fetch user from a secure database
    const user = getUserData(username);
    const hashedPassword = getUserPassword(username);

    // 3. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    // 4. If passwords match, generate a JWT with a proper payload
    if (isMatch) {
      // Create a clean payload with essential, non-sensitive data
      const payload = {
        id: user.id, // Add a unique ID for the user
        username: user.username,
      };
      
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      const books = getBooks();
      res.status(200).json({ accessToken, message: 'Login successful!', books, user });
    } else {
      // 5. Handle password mismatch
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {loginUser};