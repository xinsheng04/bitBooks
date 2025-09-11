const basicBooksUrl = "http://localhost:3000/books";
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

export async function fetchBooks(){
  try{
    const res = await fetch(`${basicBooksUrl}`, 
      getConfigObject('GET', null, {}, getAccessToken())
    );
    if(!res.ok){
      const result = await res.json();
      throw new Error(result.message);
    }
    const books = await res.json();
    return {books, error: null};
  }catch(e){
    console.log(e || "Server not responding");
    return {books: [], error: e || "Server not responding" };
  }
}
export async function searchBook(bookTitle){
  if(!bookTitle){
    return {book: {}, error: "No title provided"};
  }
  console.log("Searching for book:", bookTitle);
  try{
    const res = await fetch(`${basicBooksUrl}/search?title=${bookTitle}`, 
      getConfigObject('GET', null, {}, getAccessToken())
    );
    if(!res.ok){
      const result = await res.json();
      throw new Error(result.message);
    }
    const book = await res.json();

    return {book: book?.books, error: null};
  } catch(e){
    console.log(e || "Server not responding" );
    return {book: {}, error: e || "Server not responding" };
  }
}