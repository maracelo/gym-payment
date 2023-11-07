import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './reducers/darkModeReducer';

export const store = configureStore({
    reducer: {
        darkMode: darkModeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;