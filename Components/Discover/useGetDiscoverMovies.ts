import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularStreamingQuery,
  useGetUpcomingMoviesQuery,
} from "../../redux/apiSlice";

const useGetDiscoverMovies = () => {
  const { data: popularMovies } = useGetPopularMoviesQuery(null);
  const { data: nowPlayingMovies } = useGetNowPlayingMoviesQuery(null);
  const { data: upcomingMovies } = useGetUpcomingMoviesQuery(null);
  const { data: popularNetflix } = useGetPopularStreamingQuery(8);
  const { data: popularPrime } = useGetPopularStreamingQuery(9);
  const { data: popularMax } = useGetPopularStreamingQuery(1899);
  const { data: popularDisney } = useGetPopularStreamingQuery(337);
  const { data: popularHulu } = useGetPopularStreamingQuery(15);
  const { data: popularPeacock } = useGetPopularStreamingQuery(387);
  return [
    {
      name: "Trending",
      movies: popularMovies ? popularMovies.results : [],
    },
    {
      name: "Now Playing",
      movies: nowPlayingMovies ? nowPlayingMovies.results : [],
    },
    {
      name: "Coming Soon",
      movies: upcomingMovies ? upcomingMovies.results : [],
    },
    {
      name: "Popular on Netflix",
      movies: popularNetflix ? popularNetflix.results : [],
    },
    {
      name: "Popular on Amazon Prime Video",
      movies: popularPrime ? popularPrime.results : [],
    },
    {
      name: "Popular on Max",
      movies: popularMax ? popularMax.results : [],
    },
    {
      name: "Popular on Disney+",
      movies: popularDisney ? popularDisney.results : [],
    },
    {
      name: "Popular on Hulu",
      movies: popularHulu ? popularHulu.results : [],
    },
    {
      name: "Popular on Peacock",
      movies: popularPeacock ? popularPeacock.results : [],
    },
  ];
};

export default useGetDiscoverMovies;
