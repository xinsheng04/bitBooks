import { configureStore } from "@reduxjs/toolkit";
import fetchedBooksSlice from "./fetchedBooks";
import userSlice from "./user";

const store = configureStore({
  reducer: {
    fetchedBooks: fetchedBooksSlice.reducer,
    user: userSlice.reducer
  }
})

export default store;