import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: null,
  // error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      // state.error = null;
    },
    logout: (state) => {
      state.username = null;
      // state.error = null;
    }
  }
})

export const userActions = userSlice.actions;
export default userSlice;