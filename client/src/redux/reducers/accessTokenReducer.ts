import { createSlice } from "@reduxjs/toolkit";

const initialState = { accessToken: '' };

const slice = createSlice({
  name: 'accessToken',
  initialState,
  reducers: {
    setAccessToken: (state, action) =>{
      state.accessToken = action.payload;
    }
  }
});

export const { setAccessToken } = slice.actions;
export default slice.reducer;