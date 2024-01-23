import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Genre, Genres, Keyword, KeywordMap } from "../constants";

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
}

const initialState: InitialFlowType = {
  step: 0,
  genres: [],
  keywords: [],
  filters: {},
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload;
    },
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
    addKeyword: (state, action) => {
      /*let currList = state.activeList;
      state.activeList = [action.payload, ...currList];
      */
    },
    resetFlow: () => {
      return initialState;
    },
    updateFilters: (state, action) => {
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
  },
});

export const {
  updateStep,
  updateGenre,
  updateKeywords,
  addKeyword,
  resetFlow,
  updateFilters,
} = flowSlice.actions;

export default flowSlice.reducer;
