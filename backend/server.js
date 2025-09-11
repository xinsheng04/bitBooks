const express = require('express');
require('dotenv').config();

const {loadInitialBooks} = require('./bookFn/loadInitialBooks');
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

app.post('/users/login', loginUser);

app.post('/users/signUpUser', signUpUser);

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}...`);
    loadInitialBooks();
});
