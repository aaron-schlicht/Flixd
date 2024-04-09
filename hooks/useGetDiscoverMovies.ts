import { useSelector } from "react-redux";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularStreamingQuery,
  useGetUpcomingMoviesQuery,
} from "../redux/apiSlice";
import { RootState } from "../redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "../types";

const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const BASE_PARAMS =
  "&include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=300.0&vote_average.gte=7.0&with_original_language=en&without_genres=99,10402&with_runtime.gte=60&watch_region=US";

const useGetDiscoverMovies = () => {
  const streamingServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const { data: popularMovies } = useGetPopularMoviesQuery(null);
  const { data: nowPlayingMovies } = useGetNowPlayingMoviesQuery(null);
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery(null);
  const serviceString = streamingServices
    .map((service, index) =>
      index === streamingServices.length - 1
        ? `${service.provider_id}`
        : `${service.provider_id}|`
    )
    .join("");
  const { data: popularStreaming } = useGetPopularStreamingQuery(serviceString);
  const [streamingRecs, setStreamingRecs] = useState<
    { name: string; movies: Movie[] }[]
  >([]);

  const getStreamingRecs = async () => {
    if (streamingServices.length === 0) {
      setStreamingRecs([]);
    }
    for (const service of streamingServices) {
      try {
        const query =
          BASE_URL +
          BASE_PARAMS +
          `&with_watch_providers=${service.provider_id}`;
        const response = await axios.get(query);
        if (response && response.data) {
          const movies = response.data.results as Movie[];

          if (
            movies &&
            movies.length > 0 &&
            !streamingRecs.find(
              (value) => value.name === `Recommended on ${service.name}`
            )
          ) {
            setStreamingRecs([
              ...streamingRecs,
              { name: `Recommended on ${service.name}`, movies },
            ]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getStreamingRecs();
  }, [streamingServices]);

  return [
    {
      name:
        streamingServices.length > 0 ? "Trending on your services" : "Trending",
      movies:
        streamingServices.length > 0
          ? popularStreaming
            ? popularStreaming.results
            : []
          : popularMovies
          ? popularMovies.results
          : [],
    },
    ...streamingRecs,
    {
      name: "Now Playing",
      movies: nowPlayingMovies ? nowPlayingMovies.results : [],
    },
    {
      name: "Coming Soon",
      movies: upcomingMovies ? upcomingMovies.results : [],
    },
  ];
};

export default useGetDiscoverMovies;
