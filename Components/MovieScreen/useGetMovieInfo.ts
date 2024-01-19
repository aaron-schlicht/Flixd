import { useEffect, useState } from "react";
import { CastMember, CrewMember, Service } from "../../constants";
import {
  useGetExternalIdsQuery,
  useGetMovieCreditsQuery,
  useGetMovieInfoQuery,
  useGetMovieRatingQuery,
  useGetProvidersQuery,
  useGetSimilarMoviesQuery,
} from "../../redux/apiSlice";
import axios from "axios";
const OMDB_KEY = "28df3520";

const DIRECTOR = "DIRECTOR";

const useGetMovieInfo = (id: number) => {
  const { data, isLoading: isMovieDataLoading } = useGetMovieInfoQuery(id);
  const { data: movieRatingData, isLoading: isMovieRatingLoading } =
    useGetMovieRatingQuery(id);
  const { data: providersData, isLoading: isProvidersLoading } =
    useGetProvidersQuery(id);
  const { data: similarMovies, isLoading: isSimilarMoviesLoading } =
    useGetSimilarMoviesQuery(id);
  const { data: credits, isLoading: isCreditsLoading } =
    useGetMovieCreditsQuery(id);
  const { data: externalIds, isLoading: isExternalIdsLoading } =
    useGetExternalIdsQuery(id);
  const [rating, setRating] = useState("");
  const [streamingServices, setStreamingServices] = useState<Service[]>([]);
  const [topCast, setTopCast] = useState<CastMember[]>([]);
  const [topCrew, setTopCrew] = useState<CrewMember[]>([]);

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

  const getOMDBInfo = async (id: string) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRating(getMovieRating());
    setStreamingServices(getStreamingServices());
    getTopCast();
  }, [providersData, movieRatingData, credits]);

  return {
    isLoading: isMovieDataLoading || isMovieRatingLoading || isProvidersLoading,
    movie: data,
    similarMovies: similarMovies?.results || [],
    rating,
    topCast,
    topCrew,
    streamingServices,
  };
};

export default useGetMovieInfo;
