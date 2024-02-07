import { createSlice } from '@reduxjs/toolkit';

const initialState = { dark: localStorage.getItem('darkMode') === 'true' ? true : false }

const slice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action) =>{
      localStorage.setItem('darkMode', action.payload ? 'true' : 'false');
      return {...state, dark: action.payload ? true : false};
    }
  }
});

export const { setDarkMode } = slice.actions;
export default slice.reducer;