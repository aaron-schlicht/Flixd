import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CastMember,
  CrewMember,
  FullMovie,
  Keyword,
  Movie,
  Service,
} from "../constants";

export interface SearchResults {
  results: Movie[];
}

export interface KeywordSearchResults {
  results: Keyword[];
}

export interface CastResults {
  cast: CastMember[];
  crew: CrewMember[];
}

const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getSearchResults: builder.query<SearchResults, string>({
      query: (str) =>
        `/search/movie?api_key=${API_KEY}&query=${str}&include_adult=false&language=en-US&page=1`,
    }),
    getMovieInfo: builder.query<FullMovie, number>({
      query: (id) =>
        `/movie/${id}?api_key=${API_KEY}&adult=false&language=en-US`,
    }),
    getProviders: builder.query<any, number>({
      query: (id) =>
        `/movie/${id}/watch/providers?api_key=${API_KEY}&language=en-US`,
    }),
    getMovieRecommendations: builder.query<any, number>({
      query: (id) =>
        `/movie/${id}/recommendations?api_key=${API_KEY}&adult=false&language=en-US&page=1`,
    }),
    getKeywordSearchResults: builder.query<KeywordSearchResults, string>({
      query: (str) => `/search/keyword?api_key=${API_KEY}&query=${str}&page=1`,
    }),
    getMovieRating: builder.query<any, number>({
      query: (id) => `/movie/${id}/release_dates?api_key=${API_KEY}`,
    }),
    getPopularMovies: builder.query<SearchResults, null>({
      query: () =>
        `trending/movie/week?language=en-US&page=1&api_key=${API_KEY}`,
    }),
    getPopularMoviesStreaming: builder.query<SearchResults, null>({
      query: () =>
        `/discover/movie?include_adult=false&api_key=${API_KEY}&include_video=false&language=en-US&page=1&sort_by=popularity.desc&watch_region=US&with_watch_providers=8%7C9%7C337%7C1899%7C15%7C387%7C350%7C531%7C73%7C300`,
    }),
    getNowPlayingMovies: builder.query<SearchResults, null>({
      query: () =>
        `/movie/now_playing?language=en-US&page=1&region=US&api_key=${API_KEY}`,
    }),
    getUpcomingMovies: builder.query<SearchResults, null>({
      query: () =>
        `/discover/movie?include_adult=false&api_key=${API_KEY}&include_video=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${new Date().toISOString()}`,
    }),
    getTopMoviesYear: builder.query<SearchResults, null>({
      query: () =>
        `/discover/movie?include_adult=false&api_key=${API_KEY}&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&vote_average.gte=7.0&primary_release_date.gte=${new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        ).toISOString()}`,
    }),
    getSimilarMovies: builder.query<SearchResults, number>({
      query: (id) =>
        `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    }),
    getMovieCredits: builder.query<CastResults, number>({
      query: (id) => `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    }),
    getExternalIds: builder.query<any, number>({
      query: (id) => `movie/${id}/external_ids?api_key=${API_KEY}`,
    }),
  }),
});

export const {
  useGetSearchResultsQuery,
  useGetMovieInfoQuery,
  useGetMovieRecommendationsQuery,
  useGetProvidersQuery,
  useGetKeywordSearchResultsQuery,
  useLazyGetKeywordSearchResultsQuery,
  useGetMovieRatingQuery,
  useGetPopularMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetPopularMoviesStreamingQuery,
  useGetTopMoviesYearQuery,
  useGetSimilarMoviesQuery,
  useGetMovieCreditsQuery,
  useGetExternalIdsQuery,
} = apiSlice;
