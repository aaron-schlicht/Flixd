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
  keywords: number[];
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
      if (!!state.keywords.find((id) => id === action.payload)) {
        state.keywords = state.keywords.filter((id) => id !== action.payload);
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

/*
updateGenre: (state, action) => {
      if (state.genres.filter((g) => g.id === action.payload.id).length === 0) {
        let index = state.activeList.findIndex(
          (val) => val.id === action.payload.id
        );
        let keys = KeywordMap[action.payload.id].map((k) => {
          return { id: k.id, name: k.name };
        });
        state.genres = [...state.genres, action.payload];
        if (index === 0) {
          state.activeList = [
            state.activeList[0],
            ...keys,
            ...state.activeList.slice(index + 1),
          ];
        } else if (index === state.activeList.length - 1) {
          state.activeList = state.activeList = [...state.activeList, ...keys];
        } else {
          state.activeList = [
            ...state.activeList.slice(0, index + 1),
            ...keys,
            ...state.activeList.slice(index + 1),
          ];
        }
      } else {
        state.genres = [
          ...state.genres.filter((g) => g.id !== action.payload.id),
        ];
      }
    },

*/

/* if (
        state.keywords.filter((k) => k.id === action.payload.id).length === 0
      ) {
        return {
          ...state,
          keywords: [...state.keywords, action.payload],
        };
      } else {
        return {
          ...state,
          keywords: [
            ...state.keywords.filter((k) => k.id !== action.payload.id),
          ],
        };
      }*/
