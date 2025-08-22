const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { addBookToLibrary } = require('./library');
const { processBooks } = require('./bookFn/processBooks');
const { getBooks, searchBooks } = require('./bookFn/fetchBooks');
// const { findUser } = require('./userFn/getUserData');
const {addBook} = require('./userFn/addBook');
const {deleteBook} = require('./userFn/deleteBook');
const {loginUser} = require('./userFn/loginUser');
const {signUpUser} = require('./userFn/signUpUser');
const {AuthenticateToken} = require('./AuthenticateToken');

const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.use(cors());

app.get('/books', AuthenticateToken, getBooks);

app.get('/books/search', AuthenticateToken, searchBooks);

app.post('/users/:username/addBook', AuthenticateToken, addBook);

app.post('/users/:username/deleteBook', AuthenticateToken, deleteBook);

app.post('/users/login', loginUser);

app.post('/users/signUpUser', signUpUser);

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

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}...`);
    loadInitialBooks();
});
