import { createSlice } from "@reduxjs/toolkit";
import { Keyword } from "../types";

interface Filter {
  [key: string]: {
    min: number;
    max: number;
  };
}

export interface InitialFlowType {
  step: number;
  genres: number[];
  keywords: Keyword[];
  filters: Filter;
  useStreamingServices: boolean;
  sortBy: string;
  certifications: string[]; // Add certifications
}

const initialState: InitialFlowType = {
  step: 0,
  genres: [],
  keywords: [],
  filters: {
    rating: { min: 0, max: 100 },
    releaseDate: { min: 1900, max: new Date().getFullYear() },
  },
  useStreamingServices: false,
  sortBy: "popularity.desc",
  certifications: [],
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    updateGenre: (state, action) => {
      if (!!state.genres.find((id) => id === action.payload)) {
        state.genres = state.genres.filter((id) => id !== action.payload);
      } else {
        state.genres.push(action.payload);
      }
    },
    updateKeywords: (state, action) => {
      if (!!state.keywords.find(({ id }) => id === action.payload.id)) {
        state.keywords = state.keywords.filter(
          ({ id }) => id !== action.payload.id
        );
      } else {
        state.keywords.push(action.payload);
      }
    },
    resetFlow: () => {
      return initialState;
    },
    updateFilters: (state, action) => {
      if (typeof action.payload.value === "boolean") {
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload.name]: action.payload.value,
          },
        };
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: {
            ...state.filters[action.payload.name],
            min: action.payload.min,
            max: action.payload.max,
          },
        },
      };
    },
    resetFilter: (state, action) => {
      state.filters[action.payload] = initialState.filters[action.payload];
    },
    updateServiceSelect: (state, action) => {
      state.useStreamingServices = action.payload;
    },
    updateSort: (state, action) => {
      state.sortBy = action.payload;
    },
    updateCertifications: (state, action) => {
      if (!!state.certifications.find((cert) => cert === action.payload)) {
        state.certifications = state.certifications.filter(
          (cert) => cert !== action.payload
        );
      } else {
        state.certifications.push(action.payload);
      }
    },
  },
});

export const {
  updateGenre,
  updateKeywords,
  resetFlow,
  updateFilters,
  resetFilter,
  updateServiceSelect, // Export new action
  updateSort, // Export new action
  updateCertifications, // Export new action
} = flowSlice.actions;

export default flowSlice.reducer;
