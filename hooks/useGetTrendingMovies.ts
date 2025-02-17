import { useEffect, useState } from "react";
import { Movie, Service } from "../types";
import { fetchMovieServices, get, batchFetch } from "../api";

const POPULAR_MOVIES_URL = "/discover/movie";
const useGetTrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [trendingMovieServices, setTrendingMovieServices] = useState<
    Service[][]
  >([]);
  const [loading, setLoading] = useState(false);

  const fetchMoviesAndServices = async () => {
    setLoading(true);
    try {
      const { data } = await get<any>(POPULAR_MOVIES_URL, {
        params: {
          with_original_language: "en",
          sort_by: "popularity.desc",
          "vote_count.gte": 300,
        },
      });

      if (data) {
        const popularMovies = data.results as Movie[];
        setTrendingMovies(popularMovies);

        const movieIds = popularMovies.map((movie) => movie.id);
        const services = await batchFetch(movieIds, fetchMovieServices);
        setTrendingMovieServices(services);
      }
    } catch (error) {
      console.error("Error fetching movies and services:", error);
    } finally {
      setLoading(false);
    }
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
