import { get } from "../api";
import { useState, useEffect } from "react";
import { Movie } from "../types";

const NOW_PLAYING_URL = "/discover/movie";
const UPCOMING_MOVIES_URL = `/discover/movie`;
const TOTAL_PAGES = 2;

const useDiscoverMovies = (isRefreshing: boolean) => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async (url: string, params: object, page: number) => {
    try {
      const response = await get<{ results: Movie[] }>(url, {
        params: {
          ...params,
          page,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  };

  const fetchAllPages = async (url: string, params: object) => {
    const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    const results = await Promise.all(
      pages.map((page) => fetchMovies(url, params, page))
    );
    return results.flat();
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const [nowPlaying, upcoming] = await Promise.all([
          fetchAllPages(NOW_PLAYING_URL, {
            sort_by: "popularity.desc",
            with_original_language: "en",
            region: "US",
            with_release_type: "3",
            "vote_count.gte": 100,
            "primary_release_date.lte": new Date().toISOString(),
            "primary_release_date.gte": new Date(
              new Date().setMonth(new Date().getMonth() - 2)
            ).toISOString(),
          }),
          fetchAllPages(UPCOMING_MOVIES_URL, {
            "primary_release_date.gte": new Date().toISOString(),
            "primary_release_date.lte": new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            ).toISOString(),
            sort_by: "popularity.desc",
            with_original_language: "en",
          }),
        ]);

        setNowPlayingMovies(nowPlaying);
        setUpcomingMovies(upcoming);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [isRefreshing]);

  return [
    {
      name: "New Releases",
      movies: nowPlayingMovies.sort((a, b) =>
        b.release_date.localeCompare(a.release_date)
      ),
    },
    {
      name: "Coming Soon",
      movies: upcomingMovies
        .sort((a, b) => a.release_date.localeCompare(b.release_date))
        .filter((movie) => !!movie.poster_path),
    },
  ];
};

export default useDiscoverMovies;
