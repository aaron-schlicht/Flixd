import { useEffect, useState } from "react";
import {
  CastMember,
  CrewMember,
  FullMovie,
  Keyword,
  Movie,
  Service,
} from "../../constants";
import {
  useGetMovieCreditsQuery,
  useGetMovieInfoQuery,
  useGetMovieKeywordsQuery,
  useGetMovieRatingQuery,
  useGetProvidersQuery,
  useGetSimilarMoviesQuery,
} from "../../redux/apiSlice";

const DIRECTOR = "DIRECTOR";

const useGetMovieInfo = (id: number) => {
  const { data, isLoading: isMovieDataLoading } = useGetMovieInfoQuery(id);
  const genres =
    [data?.genres?.map((genre) => genre.id.toString())].join(",") || "";
  const { data: movieRatingData, isLoading: isMovieRatingLoading } =
    useGetMovieRatingQuery(id);
  const { data: providersData, isLoading: isProvidersLoading } =
    useGetProvidersQuery(id);
  const { data: similarMovieData, isLoading: isSimilarMoviesLoading } =
    useGetSimilarMoviesQuery(genres);
  const { data: credits, isLoading: isCreditsLoading } =
    useGetMovieCreditsQuery(id);
  const [rating, setRating] = useState("");
  const [streamingServices, setStreamingServices] = useState<Service[]>([]);
  const [topCast, setTopCast] = useState<CastMember[]>([]);
  const [topCrew, setTopCrew] = useState<CrewMember[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);

  const getMovieRating = () => {
    let rating = "";
    if (movieRatingData && movieRatingData.results) {
      let usRelease = movieRatingData.results.find(
        (value: any) => value.iso_3166_1 === "US"
      );
      if (usRelease && usRelease.release_dates.length) {
        if (usRelease.release_dates.length > 1) {
          rating =
            usRelease.release_dates[usRelease.release_dates.length - 1]
              .certification;
        } else {
          rating = usRelease.release_dates[0].certification;
        }
      }
    }
    return rating;
  };

  const getStreamingServices = () => {
    try {
      if (
        providersData &&
        providersData.results["US"] &&
        providersData.results["US"].flatrate
      ) {
        return providersData.results["US"].flatrate as Service[];
      }
    } catch (error) {
      console.log(error);
    }
    return [];
  };

  const getTopCast = () => {
    if (credits) {
      setTopCast(credits.cast);
      const directorOrDirectors = credits.crew.filter(
        (crew) => crew.job.toLocaleUpperCase() === DIRECTOR
      );
      setTopCrew(directorOrDirectors);
    }
  };

  const getSimilarMovies = () => {
    if (similarMovieData) {
      setSimilarMovies(
        similarMovieData.results.filter((movie) => movie.id !== id)
      );
    }
  };

  useEffect(() => {
    setRating(getMovieRating());
    setStreamingServices(getStreamingServices());
    getTopCast();
    getSimilarMovies();
  }, [providersData, movieRatingData, credits, similarMovieData]);

  return {
    isLoading: isMovieDataLoading || isMovieRatingLoading || isProvidersLoading,
    movie: data,
    similarMovies,
    rating,
    topCast,
    topCrew,
    streamingServices,
  };
};

export default useGetMovieInfo;
