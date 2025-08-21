const axios = require('axios');

const { library, addBook } = require('./library');
const { processBooks } = require('./processBooks')

function getBooks(req, res) {
  return res.status(200).json({ books: library });
}

async function searchBooks(req, res) {
  const API_KEY = process.env.API_KEY;
  const bookTitle = req.query.title;
  const loadQty = 30;

  if (!bookTitle) {
    return res.status(400).json({ message: "Search query 'title' is required." });
  }
  const foundBooks = library.filter(book => book.title === bookTitle);
  if (foundBooks.length > 0) {
    // If the book is found in the local library, return it immediately.
    console.log(`[Cache Hit] Found "${bookTitle}" in local library.`);
    return res.status(200).json({ books: foundBooks });
  }
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&maxResults=${loadQty}&key=${API_KEY}`;
  try {
    const response = await axios.get(apiUrl);
    const books = processBooks(response.data);
    books.forEach(book => addBook(book));
    return res.status(200).json({ books });
  } catch (e) {
    // Axios will automatically put the error message in e.response.data
    const errorMessage = e.response ? e.response.data.error.message : e.message;
    return res.status(e.response ? e.response.status : 500).json({ message: "Failed to fetch book from Google API.", error: errorMessage });
  }
}

// Export both functions
module.exports = {
  getBooks,
  searchBooks
};