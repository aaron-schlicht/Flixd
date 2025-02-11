import { useEffect, useState } from "react";
import { Movie, Service } from "../types";
import { fetchMovieDetails, fetchMovieServices, get } from "../api";

const POPULAR_MOVIES_URL = "/discover/movie";
const useGetTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingMovieServices, setTrendingMovieServices] = useState<
    Service[][]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchMoviesAndServices = async () => {
    setLoading(true);
    const { data } = await get<any>(POPULAR_MOVIES_URL, {
      params: {
        with_original_language: "en",
        sort_by: "popularity.desc",
        "vote_count.gte": 300,
      },
    });
    if (data) {
      const popularMovies = data.results as Movie[];
      const moviePromises = popularMovies.map(({ id }) =>
        fetchMovieDetails(id)
      );
      const servicePromises = popularMovies.map(({ id }) =>
        fetchMovieServices(id)
      );
      const movies = await Promise.all(moviePromises);
      setTrendingMovies(movies);
      const services = await Promise.all(servicePromises);
      setTrendingMovieServices(services);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMoviesAndServices();
  }, []);

  return {
    trendingMovies,
    trendingMovieServices,
    loading,
  };
};

export default useGetTrendingMovies;
