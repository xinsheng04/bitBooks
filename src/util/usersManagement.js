// Initialize from sessionStorage if available
let storedUsers = sessionStorage.getItem("userList");
export let userList = storedUsers
  ? JSON.parse(storedUsers)
  : [
      { id: "user_1", username: "alice", password: "123", savedBooks: [] },
      { id: "user_2", username: "bob", password: "456", savedBooks: [] },
    ];

// Helper to persist changes
const saveUsers = (newUsers) => {
  userList = newUsers; // reassign our exported let
  sessionStorage.setItem("userList", JSON.stringify(userList));
};

// Generate ID
const generateUniqueId = () => `user_${Date.now()}`;

// --- User helpers ---

export const findUserExists = (username) =>
  userList.some((user) => user.username === username);

export const verifyPassword = (username, password) =>
  userList.find((user) => user.username === username)?.password === password;

export const getUserData = (username) =>
  userList.find((user) => user.username === username);

// --- Book helpers ---

export const addSavedBook = (username, book) => {
  const user = getUserData(username);
  if (!user) return false;

  const newUsers = userList.map((u) => {
    if (u.id !== user.id) return u;
    // ensure no duplicate
    if (u.savedBooks.some((b) => b.id === book.id)) return u;
    return { ...u, savedBooks: [...u.savedBooks, book] }; // immutable copy
  });

  saveUsers(newUsers);
  return true;
};

export const removeSavedBook = (username, bookId) => {
  const user = getUserData(username);
  if (!user) return false;

  const newUsers = userList.map((u) =>
    u.id !== user.id
      ? u
      : { ...u, savedBooks: u.savedBooks.filter((b) => b.id !== bookId) }
  );

  saveUsers(newUsers);
  return true;
};

// --- User management ---

export const addUser = (username, password) => {
  const newUsers = [
    ...userList,
    { id: generateUniqueId(), username, password, savedBooks: [] },
  ];
  saveUsers(newUsers);
};

export const deleteUser = (userId) => {
  const newUsers = userList.filter((u) => u.id !== userId);
  if (newUsers.length === userList.length) {
    console.log("User not found");
    return false;
  }
  saveUsers(newUsers);
  return true;
};
