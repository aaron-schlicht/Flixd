import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Keyword, Movie } from "../types";
import { get } from "../api";
import { filter } from "lodash";

const BASE_URL = "/discover/movie";

const generateRandomPage = (totalPages: number | undefined) =>
  Math.ceil(Math.random() * (totalPages || 1));

const useGetFilteredMovies = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const filters = useSelector((state: RootState) => state.flow.filters);
  const currentSort = useSelector((state: RootState) => state.flow.sortBy);
  const certifications = useSelector(
    (state: RootState) => state.flow.certifications
  );
  const useStreamingServices = useSelector(
    (state: RootState) => state.flow.useStreamingServices
  );
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const buildQueryParams = (currentPage: number) => ({
    page: currentPage,
    include_adult: false,
    sort_by: currentSort,
    language: "en-US",
    "vote_count.gte": 300,
    with_genres: genres.length ? genres.join(",") : undefined,
    with_keywords: keywords.length
      ? keywords.map((k: Keyword) => k.id).join(",")
      : undefined,
    "vote_average.gte": filters.rating ? filters.rating.min * 0.1 : undefined,
    "vote_average.lte": filters.rating ? filters.rating.max * 0.1 : undefined,
    "primary_release_date.gte": filters.releaseDate
      ? `${filters.releaseDate.min}-01-01`
      : undefined,
    "primary_release_date.lte": filters.releaseDate
      ? `${filters.releaseDate.max}-12-31`
      : undefined,
    with_watch_providers: useStreamingServices
      ? `${selectedServices.map((service) => service.provider_id).join("|")}`
      : undefined,
    watch_region: "US",
    region: "US",
    "certification.gte": "G",
    "certifaction.lte": "R",
    certification_country: "US",
    certification: certifications.length
      ? certifications.join("|")
      : "G|PG|PG-13|R",
  });

  const fetchMovies = async () => {
    setLoading(true);
    if (page !== 1) {
      setPage(1);
    }
    const params = buildQueryParams(1);
    const response = await get<{ results: Movie[]; total_pages: number }>(
      BASE_URL,
      { params }
    );
    if (response.data) {
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    }
    setLoading(false);
  };

  const fetchMoreMovies = async () => {
    if (loadingMore || page >= totalPages) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    const params = buildQueryParams(nextPage);
    const response = await get<{ results: Movie[] }>(BASE_URL, { params });

    if (response.data) {
      setMovies((prev) => [...prev, ...response.data.results]);
      setPage(nextPage);
    }
    setLoadingMore(false);
  };

  const getRandomMovie = async () => {
    const page = generateRandomPage(totalPages);
    const params = buildQueryParams(Math.min(page, 40));
    const { data } = await get<any>(`/discover/movie`, { params });
    if (data && data.results) {
      console.log(data);
      const movieResults = data.results as Movie[];
      if (movieResults.length > 0) {
        console.log(movieResults.map((m) => m.title));
        const index = Math.floor(Math.random() * movieResults.length);
        const randomMovie = movieResults[index];
        return randomMovie;
      }
    }
    return null;
  };

  useEffect(() => {
    fetchMovies();
    setShowScrollTop(false);
  }, [
    genres,
    keywords,
    filters,
    currentSort,
    useStreamingServices,
    certifications,
  ]);

  return {
    movies,
    loading,
    loadingMore,
    fetchMoreMovies,
    getRandomMovie,
    showScrollTop,
    setShowScrollTop,
  };
};

export default useGetFilteredMovies;
