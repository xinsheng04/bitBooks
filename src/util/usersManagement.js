import {userList} from '../users.js';
const generateUniqueId = () => {
  return `user_${Date.now()}`;
}

export const findUserExists = (username) => {
  return userList.some(user => user.username === username);
}

export const verifyPassword = (username, password) => {
  const truePassword = userList.find(user => user.username === username)?.password;
  return truePassword === password;
}

const saveUsers = () => {
  // Save the updated userList to sessionStorage for demo purposes
  sessionStorage.setItem('userList', JSON.stringify(userList));
}

export const addUser = (username, password) => {
  userList.push({ id: generateUniqueId(), username, password, savedBooks: [] });
  saveUsers();
};

export const deleteUser = (userId) => {
  const deletedUser = userList.find(user => user.id === userId);
  if(deletedUser){
    userList = userList.filter(user => user.id !== userId);
    saveUsers();
  } else{
    console.log("User not found");
  }
}