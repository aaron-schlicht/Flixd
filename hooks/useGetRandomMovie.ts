import { useEffect, useState } from "react";
import { Movie } from "../types";
import { get } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const generateRandomPage = (totalPages: number | undefined) =>
  Math.ceil(Math.random() * (totalPages || 1));

const useGetRandomMovie = () => {
  const [totalPages, setTotalPages] = useState<number>(1);

  const isStreamingSelected = useSelector(
    (state: RootState) => state.flow.useStreamingServices
  );
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );

  const getRandomMovie = async () => {
    const page = generateRandomPage(totalPages);
    const config = {
      params: {
        sort_by: "vote_average.desc",
        "vote_count.gte": "300.0",
        "vote_average.gte": "7.0",
        without_genres: "99,10402",
        "with_runtime.gte": 60,
        page,
        watch_region: "US",
        with_watch_providers: isStreamingSelected
          ? selectedServices.map((service) => service.provider_id).join("|")
          : undefined,
      },
    };
    const { data } = await get<any>(`/discover/movie`, config);
    if (data && data.results) {
      if (data.total_pages) {
        setTotalPages(data.total_pages);
      }
      const movies = data.results as Movie[];
      return movies;
    }
    return [];
  };

  useEffect(() => {
    setTotalPages(1);
  }, [isStreamingSelected]);

  return {
    getRandomMovie,
  };
};

export default useGetRandomMovie;
