import { createSlice } from "@reduxjs/toolkit";
import { Movie, WatchProvider, Service } from "../types";

interface InitialType {
  selectedMovie: Movie | null;
  similarMovies: Movie[];
  selectedServices: WatchProvider[];
  searchResults: Movie[];
  searchResultServices: Service[][];
  isResultsLoading: boolean;
  focus: "home" | "lucky" | "search";
}

const initialState: InitialType = {
  selectedMovie: null,
  similarMovies: [],
  selectedServices: [],
  searchResults: [],
  searchResultServices: [[]],
  isResultsLoading: false,
  focus: "home",
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    updateSelectedMovie: (state, action) => {
      return { ...state, selectedMovie: action.payload };
    },
    updateSimilarMovies: (state, action) => {
      state.similarMovies = [...action.payload];
    },
    updateResultsLoading: (state, action) => {
      state.isResultsLoading = action.payload;
    },
    updateSelectedServices: (state, action) => {
      if (
        !!state.selectedServices.find(
          (s) => s.provider_id === action.payload.provider_id
        )
      ) {
        state.selectedServices = state.selectedServices.filter(
          (s) => s.provider_id !== action.payload.provider_id
        );
      } else {
        state.selectedServices.push(action.payload);
      }
    },
    updateSearchResults: (state, action) => {
      return { ...state, searchResults: action.payload };
    },
    updateSearchResultServices: (state, action) => {
      return { ...state, searchResultServices: action.payload };
    },
    removeSelectedMovie: (state) => {
      return { ...state, selectedMovie: null };
    },
    setServices: (state, action) => {
      state.selectedServices = [...action.payload];
    },
  },
});

export const {
  updateSelectedMovie,
  updateSimilarMovies,
  updateSelectedServices,
  updateSearchResults,
  updateResultsLoading,
  removeSelectedMovie,
  updateSearchResultServices,
  setServices,
} = movieSlice.actions;

export default movieSlice.reducer;
