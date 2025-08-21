const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { addBook } = require('./library');
const { processBooks } = require('./bookFn/processBooks');
const { getBooks, searchBooks } = require('./bookFn/fetchBooks');
const {getUserData} = require('./userFn/getUserData');
const {loginUser} = require('./userFn/loginUser');
const {registerNewUser} = require('./userFn/registerNewUser');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

app.get('/books', getBooks);

app.get('/books/search', searchBooks);

app.post('/users/:username/addBook');

app.post('/users/:username/deleteBook');

app.get('/users/login', loginUser);

app.post('/users/registerNewUser', registerNewUser);

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
            books.forEach(book => addBook(book));
            console.log(`Successfully loaded ${books.length} books.`);
        } else {
            console.log("Loaded 0 books. Check API key or query.");
            process.exit(1);
        }
        
    } catch (e) {
        console.error("Fatal error loading initial books:", e.message);
    }
}

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}...`);
    loadInitialBooks();
});
