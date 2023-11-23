import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";

import { usersApi } from "./api/usersApi";
import { postsApi } from "./api/postsApi";
import authSlice from "./slices/authSlice";

const persistConfig = {
  key: "crossplatform-mobile-v1.0.0",
  storage: AsyncStorage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    auth: authSlice,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }).concat(usersApi.middleware, postsApi.middleware),
});

export const persistor = persistStore(store, null, () => {
  store.getState();
});

setupListeners(store.dispatch);
