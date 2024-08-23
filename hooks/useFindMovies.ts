import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { Keyword, Movie, Service, WatchProvider } from "../types";
import { useEffect, useState } from "react";
import { fetchMovieServices } from "../api";

const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}`;
const BASE_PARAMS =
  "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc";
const EMPTY_PARAMS =
  "&include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=300.0&vote_average.gte=7.0&with_original_language=en&without_genres=99,10402&with_runtime.gte=60";

const useFindMovies = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieServices, setMovieServices] = useState<Service[][]>([]);

  const getRecommendations = async () => {
    setLoading(true);
    const customQuery =
      buildGenres(genres) +
      buildKeywords(keywords) +
      buildSelectedServices(selectedServices);
    const query = Boolean(customQuery.length)
      ? BASE_URL + BASE_PARAMS + customQuery
      : BASE_URL + EMPTY_PARAMS;
    const res = await axios.get(query);
    const movieRes: Movie[] = res.data.results.filter(
      (value: Movie) => value.poster_path
    );
    const getServicePromises = movieRes.map((value) =>
      fetchMovieServices(value.id)
    );
    const services = await Promise.all(getServicePromises);
    setMovies(movieRes);
    setMovieServices(services);
    setLoading(false);
  };

  useEffect(() => {
    getRecommendations();
  }, [genres, keywords, selectedServices]);

  return { movies, movieServices, loading };
};

const buildGenres = (genres: number[]) => {
  return Boolean(genres.length)
    ? `&with_genres=${genres
        .map((id, index) => (index === genres.length - 1 ? `${id}` : `${id},`))
        .join("")}`
    : "";
};

const buildKeywords = (keywords: Keyword[]) => {
  return Boolean(keywords.length)
    ? `&with_keywords=${keywords
        .map(({ id }, index) =>
          index === keywords.length - 1 ? `${id}` : `${id},`
        )
        .join("")}`
    : "";
};

const buildSelectedServices = (selectedServices: WatchProvider[]) => {
  return Boolean(selectedServices.length)
    ? `&watch_region=US&with_watch_providers=${selectedServices
        .map((service, index) =>
          index === selectedServices.length - 1
            ? `${service.provider_id}`
            : `${service.provider_id}|`
        )
        .join("")}`
    : "";
};

export default useFindMovies;
