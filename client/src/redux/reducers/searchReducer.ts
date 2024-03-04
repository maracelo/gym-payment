import { createSlice } from "@reduxjs/toolkit";

const initialState = { search: '' };

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch: (state, action) =>{
      return {...state, search: action.payload}
    }
  }
});

export const {setSearch} = slice.actions;
export default slice.reducer;