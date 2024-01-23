import { useEffect, useState } from "react";
import { Movie } from "../../constants";
import axios from "axios";

const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const BASE_PARAMS =
  "&include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=300.0&vote_average.gte=7.0&with_original_language=en&without_genres=99,10402&with_runtime.gte=60";

const generateRandomPage = () => Math.floor(Math.random() * 98);

const useGetRandomMovie = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

  const getRandomMovies = async () => {
    try {
      const page = generateRandomPage();
      const query = BASE_URL + BASE_PARAMS + `&page=${page}`;
      const response = await axios.get(query);
      if (response && response.data) {
        const movies = response.data.results as Movie[];
        const length = movies.length;
        if (length) {
          const index = Math.floor(Math.random() * length);
          setRandomMovie(movies[index]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomMovies();
  }, []);

  return {
    randomMovie,
    getRandomMovies,
  };
};

export default useGetRandomMovie;
