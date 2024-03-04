import { createSlice } from "@reduxjs/toolkit";

const initialState = { searchList: [] };

const slice = createSlice({
  name: 'searchList',
  initialState,
  reducers: {
    setSearchList: (state, action) =>{
      return {...state, searchList: action.payload};
    }
  }
});

export const { setSearchList } = slice.actions;
export default slice.reducer;