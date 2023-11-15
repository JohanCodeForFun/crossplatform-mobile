import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './api/usersApi';
import { postsApi } from './api/postsApi';
import authSlice from './slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "crossplatform-mobile-v1.0.0",
  storage: storage,
  whitelist: ["auth"], // Lägg till fler delar av store som du vill spara här.
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    auth: authSlice,
  })
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    usersApi.middleware,
    postsApi.middleware,
    ),
});

setupListeners(store.dispatch);
