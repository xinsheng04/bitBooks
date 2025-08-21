const bcrypt = require('bcryptjs');
const {users, addUser} = require('..users/');

async function registerNewUser(req, res){
  const {username, password} = req.body;
  if(!username ||!password){
    return res.status(400).json({message: "Both username and password are required."});
  }
  if(users.some(u => u.username === username)){
    return res.status(400).json({message: "Username already exists."});
  }
  try{
    const saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);
    addUser(username, hashedPw);
    res.status(201).json({message: "User registered successfully."});
    // Ensure user auto logins! I'll do it afterwards
  } catch(e){
    // Handle any errors during hashing
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

module.exports = {registerNewUser};