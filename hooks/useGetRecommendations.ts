import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Movie, Service } from "../types";
import { useEffect, useState } from "react";
import { fetchMovieServices, get } from "../api";
const BASE_URL = "/discover/movie";

const useGetRecommendations = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieServices, setMovieServices] = useState<Service[][]>([]);

  let config: object = {
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      sort_by: "vote_count.desc",
      with_genres: Boolean(genres.length) ? buildIdString(genres) : undefined,
      with_keywords: Boolean(keywords.length)
        ? buildIdString(keywords.map(({ id }) => id))
        : undefined,
      watch_region: "US",
      with_watch_providers: Boolean(selectedServices.length)
        ? buildIdString(selectedServices.map(({ provider_id }) => provider_id))
        : undefined,
    },
  };

  const getRecommendations = async () => {
    setLoading(true);
    const { data, error: e } = await get<any>(BASE_URL, config);
    if (data) {
      const validMovies: Movie[] = data.results.filter((value: Movie) =>
        Boolean(value.poster_path)
      );
      const getServicePromises = validMovies.map(({ id }) =>
        fetchMovieServices(id)
      );
      const services = await Promise.all(getServicePromises);
      setMovies(validMovies);
      setMovieServices(services);
    }
    setError(e);
    setLoading(false);
  };

  useEffect(() => {
    getRecommendations();
  }, [genres, keywords, selectedServices]);

  return { movies, movieServices, loading, error };
};

const buildIdString = (ids: number[]) => {
  return ids
    .map((id, index) => (index === ids.length - 1 ? `${id}` : `${id}|`))
    .join("");
};

export default useGetRecommendations;
