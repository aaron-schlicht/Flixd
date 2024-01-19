import { combineReducers, configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import flowReducer from "./flowSlice";
import { apiSlice } from "./apiSlice";

export default configureStore({
  reducer: {
    movies: movieReducer,
    flow: flowReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

const rootReducer = combineReducers({
  movies: movieReducer,
  flow: flowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
