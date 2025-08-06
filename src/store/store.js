import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  books: [],
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    loadBooks(state, action){
      state.books = action.payload;
    },
    updateBook(state, action){
      //copilot's logic for updating a book, might be updated later depending on my implementation 
      const updatedBook = action.payload;
      const existingBookIndex = state.books.findIndex(book => book.id === updatedBook.id);
      if (existingBookIndex >= 0) {
        state.books[existingBookIndex] = updatedBook;
      } else {
        state.books.push(updatedBook);
      }
    }
  }
})