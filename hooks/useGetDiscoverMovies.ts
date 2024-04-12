import { useSelector } from "react-redux";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularStreamingQuery,
  useGetUpcomingMoviesQuery,
} from "../redux/apiSlice";
import { RootState } from "../redux/store";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Movie, WatchProvider } from "../types";

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
    { name: string; id: number; movies: Movie[] }[]
  >([]);

  const usedServices = streamingRecs.filter(({ id }) =>
    Boolean(streamingServices.find((service) => service.provider_id === id))
  );
  let urls = [];
  for (const service of streamingServices) {
    if (!usedServices.find(({ id }) => id === service.provider_id)) {
      const query =
        BASE_URL + BASE_PARAMS + `&with_watch_providers=${service.provider_id}`;
      urls.push({ service, query });
    }
  }
  const requests = urls.map(({ query }) => axios.get(query));

  useEffect(() => {
    const getSetRecs = async () => {
      const recs = await getStreamingRecs(urls, requests);
      let combinedRecs = [...streamingRecs, ...recs];
      combinedRecs = combinedRecs.filter(
        ({ id }, index) =>
          Boolean(streamingServices.find((rec) => rec.provider_id === id)) &&
          combinedRecs.findIndex((rec) => rec.id === id) === index
      );
      setStreamingRecs([...combinedRecs]);
    };
    getSetRecs();
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
    {
      name: "Now Playing",
      movies: nowPlayingMovies ? nowPlayingMovies.results : [],
    },
    {
      name: "Coming Soon",
      movies: upcomingMovies ? upcomingMovies.results : [],
    },
    ...streamingRecs,
  ];
};

export default useGetDiscoverMovies;

const getStreamingRecs = async (
  urls: { service: WatchProvider; query: string }[],
  requests: Promise<AxiosResponse<any, any>>[]
) => {
  let streamingRecs: { name: string; id: number; movies: Movie[] }[] = [];
  try {
    const responses = await axios.all(requests);
    if (responses && responses.length) {
      responses.forEach((response, index) => {
        const movies = response.data.results as Movie[];
        const thisName = `Recommended on ${urls[index].service.name}`;
        if (movies && movies.length > 0) {
          streamingRecs = [
            ...streamingRecs,
            {
              name: thisName,
              id: urls[index].service.provider_id,
              movies,
            },
          ];
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  return streamingRecs;
};
