const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { addBookToLibrary } = require('./library');
const { processBooks } = require('./bookFn/processBooks');
const { searchBooks, getBooksFromLibrary } = require('./bookFn/fetchBooks');
const { addBook } = require('./userFn/addBook');
const { deleteBook } = require('./userFn/deleteBook');
const { loginUser } = require('./userFn/loginUser');
const { signUpUser } = require('./userFn/signUpUser');

const { AuthenticateToken } = require('./AuthenticateToken');

const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.use(cors({
  origin: "http://localhost:5173",   // your frontend dev server
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.get('/books', AuthenticateToken, getBooksFromLibrary);

app.get('/books/search', AuthenticateToken, searchBooks);

app.post('/users/:username/addBook', AuthenticateToken, addBook);

app.post('/users/:username/deleteBook', AuthenticateToken, deleteBook);

app.post('/users/login', async(req, res)=>{
    try{
        await loginUser(req, res);
    }catch(e){
        console.error('Error: ', e);
        res.status(500).json({message: 'Internal server error.'});
    }
});

console.log("signUpUser is: ", signUpUser);
app.post('/users/signUpUser', async(req, res)=>{
    try{
        console.log(res);
        await signUpUser(req, res);
    }catch(e){
        // Ensure this response is always sent, regardless of the error type
        console.log(e);
        res.status(500).json({ message: "Internal server error: " + (e.message || e) });
    }
});

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
