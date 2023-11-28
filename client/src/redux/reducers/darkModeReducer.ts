import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dark: localStorage.getItem('darkMode') === 'true' ? true : false
}

const slice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action) =>{
      state.dark = action.payload === 'light' ? false : true;
      localStorage.setItem('darkMode', action.payload === 'light' ? 'false' : 'true');
    }
  }
});

export const { setDarkMode } = slice.actions;
export default slice.reducer;