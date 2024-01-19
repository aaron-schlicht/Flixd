import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "../../constants";
const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
const BASE_URL = `https://api.themoviedb.org/3`;

const useRandomMovie = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);

  const fetchLatestMovieId = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/latest?api_key=${API_KEY}`
      );
      return response.data.id;
    } catch (error) {
      console.log("Error fetching latest movie id:", error);
      throw error;
    }
  };

  const fetchMovieDetails = async (movieId: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&adult=false&language=en-US`
      );
      return response.data;
    } catch (error) {
      console.log(`Error fetching movie details for id ${movieId}:`, error);
      //throw error;
    }
  };

  const generateRandomNumber = (max: number) => Math.floor(Math.random() * max);

  const getIsSuccessful = (movieDetails: Movie | null) => {
    if (!movieDetails) return false;
    else if (
      movieDetails.popularity > 10 &&
      movieDetails.vote_average > 6.0 &&
      !!movieDetails.poster_path
    ) {
      return true;
    }
  };

  const getRandomMovie = async () => {
    try {
      const latestMovieId = await fetchLatestMovieId();

      let randomId = generateRandomNumber(latestMovieId);
      let movieDetails = await fetchMovieDetails(randomId);

      let isSuccessful = getIsSuccessful(movieDetails);

      // Retry until a successful attempt
      while (!isSuccessful) {
        randomId = generateRandomNumber(latestMovieId);
        movieDetails = await fetchMovieDetails(randomId);
        isSuccessful = getIsSuccessful(movieDetails);
      }

      setRandomMovie(movieDetails);
    } catch (error) {
      console.log("Error getting random movie:", error);
    }
  };

  useEffect(() => {
    getRandomMovie();
  }, []); // Fetch random movie on component mount

  return {
    randomMovie,
    getRandomMovie,
  };
};

export default useRandomMovie;
