import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: null,
  savedBooks: []
  // error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      state.username = userData.username;
      state.savedBooks = userData.savedBooks || [];
    },
    logout: (state) => {
      state.username = null;
      state.savedBooks = [];
    },
    addSavedBook: (state, action) => {
      // Pass the entire book object
      state.savedBooks.push(action.payload);
    },
    removeSavedBook: (state, action) => {
      // Pass the book ID
      const removedBook = state.savedBooks.find(book => book.id === action.payload);
      if(removedBook){
        state.savedBooks = state.savedBooks.filter(book => book.id !== removedBook.id);
      }
    }
  }
})

export const userActions = userSlice.actions;
export default userSlice;