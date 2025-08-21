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
}
function deleteUser(username) {
  users.filter(u => u.username !== username);
}
function userExists(username) {
  return users.some(u => u.username === username);
}
function getUserData(username) {
  users.find((user) => user.username === username);
}

/* saved books management */
function addSavedBook(username, book) {
  const user = getUserData(username);
  if (!user || user.savedBooks.some(b => b.id === book.id)) return false;
  const userIdx = users.findIndex(u => u.username === username);
  users[userIdx].savedBooks.push(book);
  return true;
};

function removeSavedBook(username, bookId) {
  const user = getUserData(username);
  if (!user) return false;
  if (user.savedBooks.findIndex(b => b.id === bookId) === -1) return false;
  const userIdx = users.findIndex(u => u.username === username);
  users[userIdx].savedBooks = users[userIdx].savedBooks.filter(b => b.id !== bookId);
  return true;
};

module.exports = {
  users,
  addUser,
  deleteUser,
  userExists,
  verifyPassword,
  getUserData,
  addSavedBook,
  removeSavedBook
};