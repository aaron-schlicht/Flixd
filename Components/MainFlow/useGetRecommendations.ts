import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { Movie } from "../../constants";
import { updateSimilarMovies } from "../../redux/movieSlice";

const API_KEY = "f03e1c9e7d2633ef0b20ab2c36cddb39";
const BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const BASE_PARAMS =
  "&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc";

const useGetRecommendations = () => {
  const genres = useSelector((state: RootState) => state.flow.genres);
  const keywords = useSelector((state: RootState) => state.flow.keywords);
  const filters = useSelector((state: RootState) => state.flow.filters);
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const dispatch = useDispatch();

  const getQueryString = () => {
    let queryString = BASE_URL + BASE_PARAMS;
    if (!!genres.length) {
      queryString += `&with_genres=${genres
        .map((id, index) => (index === genres.length - 1 ? `${id}` : `${id},`))
        .join("")}`;
    }
    if (!!keywords.length) {
      queryString += `&with_keywords=${keywords
        .map(({ id, name }, index) =>
          index === keywords.length - 1 ? `${id}` : `${id}|`
        )
        .join("")}`;
    }
    if (!!Object.keys(filters).length) {
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
    const queryString = getQueryString();
    console.log(queryString);
    try {
      const response = await axios.get(queryString);
      if (response && response.data) {
        //dispatch(updateSimilarMovies(response.data.results as Movie[]));
        return response.data.results as Movie[];
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { getRecommendations };
};

export default useGetRecommendations;
