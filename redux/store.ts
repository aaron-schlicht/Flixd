import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import flowReducer from "./flowSlice";
import { apiSlice } from "./apiSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
const config = {
  key: "root",
  storage: AsyncStorage,
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
