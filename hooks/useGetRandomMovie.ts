import { useEffect, useState } from "react";
import { Movie, Service } from "../types";
import { fetchMovieServices, get } from "../api";

const generateRandomPage = () => Math.ceil(Math.random() * 98);

const useGetRandomMovie = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  const getRandomMovie = async () => {
    const page = generateRandomPage();
    const config = {
      params: {
        sort_by: "vote_average.desc",
        "vote_count.gte": "300.0",
        "vote_average.gte": "7.0",
        without_genres: "99,10402",
        "with_runtime.gte": 60,
        page,
      },
    };
    const { data } = await get<any>(`/discover/movie`, config);
    if (data && data.results) {
      const movies = data.results as Movie[];
      const length = movies.length;
      if (length) {
        const index = Math.floor(Math.random() * length);
        setRandomMovie(movies[index]);
        const movieServices = await fetchMovieServices(movies[index].id);
        setServices(movieServices);
      }
    }
  };

  useEffect(() => {
    getRandomMovie();
  }, []);

  return {
    randomMovie,
    services,
    getRandomMovie,
  };
};

export default useGetRandomMovie;
