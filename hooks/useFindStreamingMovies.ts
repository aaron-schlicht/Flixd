import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Movie } from "../types";
import { get } from "../api";

const BASE_URL = "/discover/movie";

const useFindStreamingMovies = (isRefreshing: boolean) => {
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const [data, setData] = useState<{ name: string; movies: Movie[] }[]>([]);

  const fetchStreamingMovies = async () => {
    if (selectedServices.length > 0) {
      let allData = [];
      for (const service of selectedServices) {
        const { data: serviceData } = await get<{ results: Movie[] }>(
          BASE_URL,
          {
            params: {
              watch_region: "US",
              with_watch_providers: service.provider_id,
            },
          }
        );
        if (serviceData && serviceData.results) {
          allData.push({
            name: service.provider_name,
            movies: serviceData.results,
          });
        }
      }
      setData(allData);
    }
  };

  useEffect(() => {
    fetchStreamingMovies();
  }, []);

  useEffect(() => {
    fetchStreamingMovies();
  }, [selectedServices, isRefreshing]);

  return data;
};

export default useFindStreamingMovies;
