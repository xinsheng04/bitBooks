const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {users} = require('../users');


async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // 1. Fetch user from a secure database
    const user = users.find(u => u.username === username);

    // 2. Handle user not found
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // 3. Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // 4. If passwords match, generate a JWT with a proper payload
    if (isMatch) {
      // Create a clean payload with essential, non-sensitive data
      const payload = {
        id: user.id, // Add a unique ID for the user
        username: user.username,
      };
      
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

      res.status(200).json({ accessToken, message: 'Login successful!' });
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