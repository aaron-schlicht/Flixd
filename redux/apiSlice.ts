import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CastMember, CrewMember, Keyword, Movie } from "../types";

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

export interface CrewMovie extends Movie {
  job?: string;
}

export interface PersonCreditResults {
  cast: Movie[];
  crew: CrewMovie[];
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),

  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getSearchResults: builder.query<SearchResults, string>({
      query: (str) =>
        `/search/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&query=${str}&include_adult=false&language=en-US&page=1`,
    }),
    getMovieInfo: builder.query<Movie, number>({
      query: (id) =>
        `/movie/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&adult=false&language=en-US`,
    }),
    getProviders: builder.query<any, number>({
      query: (id) =>
        `/movie/${id}/watch/providers?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`,
    }),
    getMovieRecommendations: builder.query<any, number>({
      query: (id) =>
        `/movie/${id}/recommendations?api_key=${process.env.EXPO_PUBLIC_API_KEY}&adult=false&language=en-US&page=1`,
    }),
    getKeywordSearchResults: builder.query<KeywordSearchResults, string>({
      query: (str) =>
        `/search/keyword?api_key=${process.env.EXPO_PUBLIC_API_KEY}&query=${str}&page=1`,
    }),
    getMovieRating: builder.query<any, number>({
      query: (id) =>
        `/movie/${id}/release_dates?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    }),
    getPopularMovies: builder.query<SearchResults, null>({
      query: () =>
        `trending/movie/week?language=en-US&page=1&api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    }),
    getPopularMoviesStreaming: builder.query<SearchResults, null>({
      query: () =>
        `/discover/movie?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}&include_video=false&language=en-US&page=1&with_original_language=en&sort_by=popularity.desc&vote_count.gte=40.0&watch_region=US&with_watch_providers=8%7C9%7C337%7C1899%7C15%7C386%7C350%7C531%7C73%7C300`,
    }),
    getNowPlayingMovies: builder.query<SearchResults, null>({
      query: () =>
        `/movie/now_playing?language=en-US&page=1&region=US&api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    }),
    getUpcomingMovies: builder.query<SearchResults, null>({
      query: () =>
        `/discover/movie?include_adult=false&api_key=${
          process.env.EXPO_PUBLIC_API_KEY
        }&include_video=false&language=en-US&page=1&with_original_language=en&sort_by=popularity.desc&primary_release_date.gte=${new Date().toISOString()}`,
    }),
    getTopMoviesYear: builder.query<SearchResults, null>({
      query: () =>
        `/discover/movie?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=10000&with_original_language=en&vote_average.gte=7.0`,
    }),
    getSimilarMovies: builder.query<SearchResults, string>({
      query: (genres) =>
        `/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&include_adult=false&with_genres=${genres}&sort_by=vote_count.desc&language=en-US&page=1&with_original_language=en`,
    }),
    getMovieCredits: builder.query<CastResults, number>({
      query: (id) =>
        `/movie/${id}/credits?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`,
    }),
    getMovieKeywords: builder.query<{ keywords: Keyword[] }, number>({
      query: (id) =>
        `/movie/${id}/keywords?api_key=${process.env.EXPO_PUBLIC_API_KEY}`,
    }),
    getPersonCredits: builder.query<PersonCreditResults, number>({
      query: (id) =>
        `person/${id}/movie_credits?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`,
    }),
    getPopularStreaming: builder.query<SearchResults, string>({
      query: (id) =>
        `/discover/movie?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}&include_video=false&language=en-US&page=1&with_original_language=en&sort_by=popularity.desc&vote_count.gte=40.0&watch_region=US&with_watch_providers=${id}`,
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
  useGetMovieKeywordsQuery,
  useGetPersonCreditsQuery,
  useGetPopularStreamingQuery,
} = apiSlice;
