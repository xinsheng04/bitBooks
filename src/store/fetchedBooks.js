import { createSlice } from "@reduxjs/toolkit";
/*
books structure
title: string,
subtitle: string,
authors: string[],
publisher: string,
publishedDate: string,
description: string,
 
*/
const initialState = {
  books: [],
  firstLoad: false
}

const fetchedBooksSlice = createSlice({
  name: 'fetchedBooks',
  initialState,
  reducers: {
    loadBooks(state, action){
      if(!state.firstLoad && action.payload.firstLoad){
        state.books = action.payload.books;
        state.firstLoad = true;
      } else{
        state.books = [...state.books, ...action.payload.books];
      }
    },
    updateBook(state, action){
      // copilot's logic for updating a book, might be updated later depending on my implementation 
      // as of right now it is not used
      const updatedBook = action.payload;
      const existingBookIndex = state.books.findIndex(book => book.id === updatedBook.id);
      if (existingBookIndex >= 0) {
        state.books[existingBookIndex] = updatedBook;
      } else {
        state.books.push(updatedBook);
      }
    }
  }
});

export const fetchedBooksActions = fetchedBooksSlice.actions;
export default fetchedBooksSlice;
