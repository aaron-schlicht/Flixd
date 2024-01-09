import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularMoviesStreamingQuery,
  useGetTopMoviesYearQuery,
  useGetUpcomingMoviesQuery,
} from "../../redux/apiSlice";

const useGetDiscoverMovies = () => {
  const { data: popularMovies } = useGetPopularMoviesQuery(null);
  const { data: popularStreamingMovies } =
    useGetPopularMoviesStreamingQuery(null);
  const { data: nowPlayingMovies } = useGetNowPlayingMoviesQuery(null);
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery(null);
  const { data: topYearMovies } = useGetTopMoviesYearQuery(null);

  return [
    {
      name: "Trending Movies",
      movies: popularMovies ? popularMovies.results : [],
    },
    {
      name: "Now Playing",
      movies: nowPlayingMovies ? nowPlayingMovies.results : [],
    },
    {
      name: "Popular on Streaming",
      movies: popularStreamingMovies ? popularStreamingMovies.results : [],
    },
    {
      name: "Upcoming Movies",
      movies: upcomingMovies ? upcomingMovies.results : [],
    },
    {
      name: "Top Rated Movies This Year",
      movies: topYearMovies ? topYearMovies.results : [],
    },
  ];
};

export default useGetDiscoverMovies;
