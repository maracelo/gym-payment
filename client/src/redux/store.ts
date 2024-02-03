import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reducers/darkModeReducer';
import accessTokenReducer from './reducers/accessTokenReducer';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    accessToken: accessTokenReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;