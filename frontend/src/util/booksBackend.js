const basicBooksUrl = "https://localhost:3000/books";
const getConfigObject = (callMethod) => {
  return {
    method: callMethod,
    headers: {
      'Content-Type': 'application/json',
    }
  }
}
export async function fetchBooks(){
  try{
    const res = await fetch(`${basicBooksUrl}`, getConfigObject('GET'));
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
  try{
    const res = await fetch(`${basicBooksUrl}/search?title=${bookTitle}`, getConfigObject('GET'));
    if(!res.ok){
      const result = await res.json();
      throw new Error(result.message);
    }
    const book = res.json();
    return {book, error: null};
  } catch(e){
    console.log(e || "Server not responding" );
    return {book: {}, error: e || "Server not responding" };
  }
}