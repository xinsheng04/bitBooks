import { configureStore } from "@reduxjs/toolkit";
import fetchedBooksSlice from "./fetchedBooks";

const store = configureStore({
  reducer: { fetchedBooks: fetchedBooksSlice.reducer }
})

export default store;