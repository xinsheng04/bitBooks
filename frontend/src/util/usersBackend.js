const basicUsersUrl = "http://localhost:3000/users";
const getConfigObject = (callMethod, body = {}, headers = {}, bearerToken = "") => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add the bearer token to the headers if it exists
  if (bearerToken) {
    defaultHeaders['Authorization'] = `Bearer ${bearerToken}`;
  }

  const configObject = {
    method: callMethod,
    headers: {
      ...defaultHeaders,
      ...headers, // This allows new headers to be added or existing ones to be overridden
    },
  };

  if (body) {
    configObject.body = JSON.stringify(body);
  }
  console.log(configObject);
  return configObject;
};

const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${basicUsersUrl}/login`,
      getConfigObject('POST', { username, password })
    );

    if (!response.ok) {
      // This block handles failed login attempts (e.g., 401 Unauthorized)
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
      // Return a structured error object for the caller
      return { success: false, message: errorData.message || 'Login failed.' };
    }

    // This block handles a successful login (response.ok is true)
    const result = await response.json();
    const books = result.books;
    const user = result.user;
    sessionStorage.setItem('accessToken', result.accessToken);
    return { success: true, message: result.message, books, user };

  } catch (e) {
    // This block handles network errors (e.g., server is down)
    console.error('Network error during login:', e);
    return { success: false, message: e.message ||'Could not connect to the server. Please try again later.' };
  }
}

export async function signUpUser(username, password) {
  if (!username || !password) {
    return false;
  }
  try {
    // Note: backend will throw an error if user already exists
    console.log(`${basicUsersUrl}/signUpUser`);
    // const res = await fetch(`${basicUsersUrl}/signUpUser`, 
    //   getConfigObject('POST', {username,password})
    // );
    const res = await fetch(`${basicUsersUrl}/signUpUser`, 
      getConfigObject('POST', { username, password })
    );
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Sign up failed");
    }
    const books = result.books;
    const user = result.user;
    sessionStorage.setItem('accessToken', result.accessToken);
    return { success: true, message: result.message, books, user };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.message || "Sign up failed" };
  }
}

export async function addSavedBook(username, bookId) {
  if (!username)
    return;
  try {
    // Corrected URL: remove the colon before username
    const res = await fetch(`${basicUsersUrl}/${username}/addBook?bookId=${bookId}`,
      getConfigObject('POST', null, {}, getAccessToken()));
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
    // Corrected URL: remove the colon before username
    const res = await fetch(`${basicUsersUrl}/${username}/deleteBook?bookId=${bookId}`,
      getConfigObject('POST', null, {}, getAccessToken()));
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
