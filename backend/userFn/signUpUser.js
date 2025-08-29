const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserData } = require('../users');
const { getBooks } = require('../library');
const { addUser } = require('../users');

async function signUpUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Both username and password are required." });
  }
  if (getUserData(username)) {
    return res.status(400).json({ message: "Username already exists." });
  }
  const saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);
  const payload = addUser(username, hashedPw);
  if(!payload){
    return res.status(500).json({ message: "User could not be created" });
  }
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  const books = getBooks();
  const user = { username, savedBooks: [] };
  console.log("Signed up");
  res.status(200).json({ accessToken, message: 'Sign up successful!', books, user });
}

module.exports = { signUpUser };