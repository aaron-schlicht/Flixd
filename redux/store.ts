import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import flowReducer from "./flowSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
const config = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
};

const rootReducer = combineReducers({
  movies: movieReducer,
  flow: flowReducer,
});

const persistedReducer = persistReducer(config, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
