import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Movie } from "../types";
import { get } from "../api";
import { debounce, sortBy } from "lodash";

const BASE_URL = "/discover/movie";

const useFilteredMovies = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const filters = useSelector((state: RootState) => state.flow.filters);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const buildQueryParams = () => {
    const params: any = {
      sortBy: "popularity.desc",
      "vote_count.gte": 100,
      include_adult: false,
    };

    if (genres.length) {
      params.with_genres = genres.join(",");
    }

    if (keywords.length) {
      params.with_keywords = keywords.map((keyword) => keyword.id).join(",");
    }

    if (filters.rating) {
      params["vote_average.gte"] = filters.rating.min * 0.1;
      params["vote_average.lte"] = filters.rating.max * 0.1;
    }

    if (filters.releaseDate) {
      params["primary_release_date.gte"] = `${filters.releaseDate.min}-01-01`;
      params["primary_release_date.lte"] = `${filters.releaseDate.max}-12-31`;
    }

    return params;
  };

  const fetchMovies = async () => {
    setLoading(true);
    const params = buildQueryParams();
    const response = await get<{ results: Movie[] }>(BASE_URL, { params });
    setMovies(response.data.results);
    setLoading(false);
  };

  const debouncedFetchMovies = debounce(fetchMovies, 1000);

  useEffect(() => {
    debouncedFetchMovies();
    return () => {
      debouncedFetchMovies.cancel();
    };
  }, [genres, keywords, filters]);

  return { movies, loading };
};

export default useFilteredMovies;
