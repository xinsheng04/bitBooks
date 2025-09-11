const { addBookToLibrary } = require('../library');
const { processBooks } = require('../bookFn/processBooks');
const axios = require('axios');

async function loadInitialBooks() {
    const API_KEY = process.env.API_KEY;
    const loadQty = 30;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=a&maxResults=${loadQty}&key=${API_KEY}`;
    
    if (!API_KEY) {
        console.error("Fatal: API_KEY is not defined in the .env file!");
        process.exit(1);
    }

    try {
        const response = await axios.get(apiUrl);
        const books = processBooks(response.data);
        if (books.length > 0) {
            books.forEach(book => addBookToLibrary(book));
            console.log(`Successfully loaded ${books.length} books.`);
        } else {
            console.log("Loaded 0 books. Check API key or query.");
            process.exit(1);
        }
        
    } catch (e) {
        console.error("Fatal error loading initial books:", e.message);
    }
}

module.exports = {loadInitialBooks}