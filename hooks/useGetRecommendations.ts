import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { Movie } from "../types";
import { useState } from "react";

const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const BASE_PARAMS =
  "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc";
const EMPTY_PARAMS =
  "&include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=300.0&vote_average.gte=7.0&with_original_language=en&without_genres=99,10402&with_runtime.gte=60";

const useGetRecommendations = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const filters = useSelector((state: RootState) => state.flow.filters);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const [loading, setLoading] = useState(false);

  const getQueryString = () => {
    let queryString = "";
    if (!!genres.length) {
      queryString += `&with_genres=${genres
        .map((id, index) => (index === genres.length - 1 ? `${id}` : `${id},`))
        .join("")}`;
    }
    if (!!keywords.length) {
      queryString += `&with_keywords=${keywords
        .map(({ id, name }, index) =>
          index === keywords.length - 1 ? `${id}` : `${id},`
        )
        .join("")}`;
    }

    if (!!selectedServices.length) {
      queryString += `&watch_region=US`;
      queryString += `&with_watch_providers=${selectedServices
        .map((service, index) =>
          index === selectedServices.length - 1
            ? `${service.provider_id}`
            : `${service.provider_id}|`
        )
        .join("")}`;
    }
    return queryString;
  };

  const getRecommendations = async () => {
    setLoading(true);
    const queryString = getQueryString();
    const query =
      queryString.length === 0
        ? BASE_URL + EMPTY_PARAMS + `&page=${Math.ceil(Math.random() * 50)}`
        : BASE_URL + BASE_PARAMS + queryString;
    try {
      const response = await axios.get(query);
      setLoading(false);
      if (response && response.data) {
        return response.data.results as Movie[];
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return { getRecommendations, loading };
};

export default useGetRecommendations;

/*if (!!Object.keys(filters).length) {
      if (!!filters["year"]) {
        const { min, max } = filters["year"];
        queryString += `&release_date.gte=${new Date(
          min + 1890,
          0,
          1
        ).toISOString()}`;
        queryString += `&release_date.lte=${new Date(
          max + 1890,
          11,
          31
        ).toISOString()}`;
        console.log(queryString);
      }
      if (!!filters["length"]) {
        const { min, max } = filters["length"];
        queryString += `&with_runtime.gte=${min}`;
        queryString += `&with_runtime.lte=${max}`;
      }
      if (!!filters["rating"]) {
        const { min, max } = filters["rating"];
        queryString += `&vote_average.gte=${min / 10}`;
        queryString += `&vote_average.lte=${max / 10}`;
      }
    }*/
