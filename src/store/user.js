import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: null,
  isLoggedIn: false,
  // error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
      // state.error = null;
    },
    logout: (state, action) => {
      state.username = null;
      state.isLoggedIn = false;
      // state.error = null;
    }
  }
})

export const userActions = userSlice.actions;
export default userSlice;