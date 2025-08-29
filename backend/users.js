const { library } = require("./library");

const users = [];

/* user management */

function generateUniqueId() {
  return `user_${Date.now()}`;
}

function addUser(username, password) {
  const newUser = {
    id: generateUniqueId(),
    username,
    password,
    savedBooks: []
  };
  users.push(newUser);
  return {id: newUser.id, username: newUser.username};
}
function deleteUser(username) {
  users.filter(u => u.username !== username);
}
function userExists(username) {
  return users.some(u => u.username === username);
}
function getUserData(username) {
  const user = users.find((user) => user.username === username);
  return user ? { username: user.username, savedBooks: user.savedBooks } : null;
}

function getUserPassword(username) {
  const user = users.find((user) => user.username === username);
  return user ? user.password : null;
}

/* saved books management */
function addSavedBook(username, bookId) {
  const user = getUserData(username);
  if(!user){
    throw new Error("User not provided or does not exist");
  }
  if (user.savedBooks.some(b => b.id === bookId)){
    throw new Error("Book already exists.");
  }
  const userIdx = users.findIndex(u => u.username === username);
  const book = library.find(b => b.id === bookId);
  if(!book){
    throw new Error("Book not found in library");
  }
  users[userIdx].savedBooks.push(book);
  return true;
};

function removeSavedBook(username, bookId) {
  const user = getUserData(username);
  if (!user){
    throw new Error("User not provided");
  }
  if (user.savedBooks.findIndex(b => b.id === bookId) === -1){
    throw new Error("Book not found.");
  }
  const userIdx = users.findIndex(u => u.username === username);
  users[userIdx].savedBooks = users[userIdx].savedBooks.filter(b => b.id !== bookId);
  return true;
};

module.exports = {
  // users,
  getUserPassword,
  addUser,
  deleteUser,
  userExists,
  getUserData,
  addSavedBook,
  removeSavedBook
};