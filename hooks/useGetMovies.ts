import { useState } from "react";
import { Movie } from "../types";
import { get } from "../api";

interface UseGetMoviesOptions {
  endpoint: string;
  params?: Record<string, any>;
}

const useGetMovies = ({ endpoint, params = {} }: UseGetMoviesOptions) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (refresh = false) => {
    if (refresh) {
      setLoading(true);
      setPage(1);
      try {
        const response = await get<{ results: Movie[]; total_pages: number }>(
          endpoint,
          { params: { ...params, page: 1 } }
        );
        if (response.data) {
          setMovies(response.data.results);
          setHasMore(response.data.total_pages > 1);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  };

  const fetchMoreMovies = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await get<{ results: Movie[]; total_pages: number }>(
        endpoint,
        { params: { ...params, page: nextPage } }
      );

      if (response.data) {
        setMovies((prev) => [...prev, ...response.data.results]);
        setPage(nextPage);
        setHasMore(nextPage < response.data.total_pages);
      }
    } catch (error) {
      console.error(error);
    }
    setLoadingMore(false);
  };

  return {
    movies,
    loading,
    loadingMore,
    fetchMovies,
    fetchMoreMovies,
  };
};

export default useGetMovies;
