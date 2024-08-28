import { useFetchList } from "../api";

const POPULAR_MOVIES_URL = "/trending/movie/week";
const NOW_PLAYING_URL = "/movie/now_playing?region=US";
const UPCOMING_MOVIES_URL = `/discover/movie`;

const useDiscoverMovies = (isRefreshing: boolean) => {
  const {
    list: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useFetchList(POPULAR_MOVIES_URL, isRefreshing);

  const {
    list: nowPlayingMovies,
    loading: nowPlayingMoviesLoading,
    error: nowPlayingMoviesError,
  } = useFetchList(NOW_PLAYING_URL, isRefreshing);
  const {
    list: upcomingMovies,
    loading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useFetchList(UPCOMING_MOVIES_URL, isRefreshing, {
    params: {
      sort_by: "popularity.desc",
      "primary_release_date.gte": new Date().toISOString(),
      with_original_language: "en",
    },
  });

  return [
    {
      name: "Trending",
      movies: popularMovies,
    },
    {
      name: "Now Playing",
      movies: nowPlayingMovies,
    },
    {
      name: "Coming Soon",
      movies: upcomingMovies,
    },
  ];
};

export default useDiscoverMovies;