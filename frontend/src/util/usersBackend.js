const basicUsersUrl = "https://localhost:3000/users";
const getConfigObject = (callMethod, body={}) => {
  return {
    method: callMethod,
    headers: {
      'Content-Type': 'application/json',
    },
    body
  }
}
// Commented out: the user data will be returned by the login function upon a successful login
// JWT token will be implemented in the future 
// export async function getUserData(username) {
//   try {
//     // returns user object, status code 2xx if exists, status code 4xx if not
//     const res = await fetch(`${basicUsersUrl}?username=${encodeURIComponent(username)}`,
//       getConfigObject('GET'));
//     if (!res.ok) {
//       const result = await res.json();
//       throw new Error(result.message);
//     }
//     const user = res.json();
//     return { user, error: null };
//   } catch (e) {
//     console.log(e || "Server not responding.");
//     return { user: null, error: e.message || "Server not responding" };
//   }
// }

export async function addSavedBook(username, bookId) {
  if (!username)
    return;
  try {
    const { error } = await getUserData(username);
    if (error) {
      throw new Error("User does not exist. Book adding failed.");
    }
    // returns 2xx if successful, 4xx with error message if not
    const res = await fetch(`${basicUsersUrl}/:${username}/addBook?bookId=${bookId}`,
      getConfigObject('POST'));
    if (!res.ok) {
      // Read the response body to get the error message
      const errorData = await res.json(); 
      throw new Error(errorData.message || "Book adding failed.");
    }
    return true;
  } catch (e) {
    console.log(e || "Server not responding.");
    return false;
  }
}

export async function deleteSavedBook(username, bookId) {
  if (!username)
    return;
  try {
    const { error } = await getUserData(username);
    if (error) {
      throw new Error("User does not exist. Book deleting failed.");
    }
    // returns 2xx if successful, 4xx with error message if not
    const res = await fetch(`${basicUsersUrl}/:${username}/deleteBook?bookId=${bookId}`,
      getConfigObject('POST'));
    if (!res.ok) {
      // Read the response body to get the error message
      const errorData = await res.json(); 
      throw new Error(errorData.message || "Book deleting failed.");
    }
    return true;
  } catch (e) {
    console.log(e || "Server not responding.");
    return false;
  }
}

export async function registerNewUser(username, password){
  if(!username || !password){
    return false;
  }
  try{
    // Note: backend will throw an error if user already exists
    const res = await fetch(`${basicUsersUrl}/registerNewUser`, 
      getConfigObject('POST'), {
        username,
        password
      });
    if(!res.ok){
      const result = await res.json();
      throw new Error(result);
    }
    return true;
  } catch(e){
    console.log(result);
    return false;
  }
}

// I'll integrate this later
export async function loginUser(username, password) {
  try {
    const response = await fetch(`${basicUsersUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (!response.ok) {
      // This block handles failed login attempts (e.g., 401 Unauthorized)
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
      // Return a structured error object for the caller
      return { success: false, message: errorData.message || 'Login failed.' };
    }

    // This block handles a successful login (response.ok is true)
    const result = await response.json();
    console.log('Login successful:', result.message);
    // You might also receive a JWT token from the backend here
    return { success: true, message: result.message };

  } catch (e) {
    // This block handles network errors (e.g., server is down)
    console.error('Network error during login:', e);
    return { success: false, message: 'Could not connect to the server. Please try again later.' };
  }
}