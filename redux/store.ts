import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import flowReducer from "./flowSlice";
import { apiSlice } from "./apiSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const config = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["flow"],
};

const rootReducer = combineReducers({
  movies: movieReducer,
  flow: flowReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(config, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
