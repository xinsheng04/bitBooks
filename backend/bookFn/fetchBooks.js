const axios = require('axios');

const { library, addBookToLibrary } = require('../library');
const { processBooks } = require('./processBooks')

function getBooksFromLibrary() {
  return { books: library };
}

async function searchBooks(req, res) {
  const API_KEY = process.env.API_KEY;
  const bookTitle = req.query.title;
  const loadQty = 30;

  if (!bookTitle) {
    return res.status(400).json({ message: "Search query 'title' is required." });
  }
  console.log(`[Search] Looking for "${bookTitle ? bookTitle : null}"...`);
  const foundBooks = library.filter(book => book.title.toLowerCase().includes(bookTitle.toLowerCase()));
  if (foundBooks.length > 0) {
    // If the book is found in the local library, return it immediately.
    console.log(`[Cache Hit] Found "${bookTitle}" in local library.`);
    return res.status(200).json({ books: foundBooks });
  }
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&maxResults=${loadQty}&key=${API_KEY}`;
  try {
    const response = await axios.get(apiUrl);
    if (!response.data || !response.data.items) {
      return res.status(200).json({ books: [] });
    }
    const books = processBooks(response.data);
    books.forEach(book => addBookToLibrary(book));
    return res.status(200).json({ books });
  } catch (e) {
    console.error('Search error:', e);
    return res.status(500).json({ books: [], error: "Failed to fetch books from API" });
  }
}

// Export both functions
module.exports = {
  getBooksFromLibrary,
  searchBooks
};