import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reducers/darkModeReducer';
import accessTokenReducer from './reducers/accessTokenReducer';
import searchListReducer from './reducers/searchListReducer';
import searchReducer from './reducers/searchReducer';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    accessToken: accessTokenReducer,
    search: searchReducer,
    searchList: searchListReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;