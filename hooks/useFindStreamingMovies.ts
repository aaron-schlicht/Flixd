import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Movie } from "../types";
import { get } from "../api";

type ServiceData = {
  name: string;
  movies: Movie[];
  imagePath?: string;
  page: number;
  isLoading: boolean;
};

const useFindStreamingMovies = (isRefreshing: boolean, baseUrl: string) => {
  const selectedServices = useSelector(
    (state: RootState) => state.movies.selectedServices
  );
  const [data, setData] = useState<ServiceData[]>([]);

  const fetchServiceMovies = async (
    service: (typeof selectedServices)[0],
    currentPage: number,
    reset = false
  ) => {
    const { data: serviceData } = await get<{ results: Movie[] }>(baseUrl, {
      params: {
        watch_region: "US",
        with_watch_providers: service.provider_id,
        page: currentPage,
        "vote_count.gte": 300,
      },
    });

    if (serviceData && serviceData.results) {
      setData((prevData) => {
        const existingServiceIndex = prevData.findIndex(
          (s) => s.name === service.provider_name
        );
        const newMovies = reset
          ? serviceData.results
          : existingServiceIndex >= 0
          ? [...prevData[existingServiceIndex].movies, ...serviceData.results]
          : serviceData.results;

        const updatedService = {
          name: service.provider_name,
          movies: newMovies,
          imagePath: service.logo_path,
          page: currentPage,
          isLoading: false,
        };

        if (existingServiceIndex >= 0) {
          const newData = [...prevData];
          newData[existingServiceIndex] = updatedService;
          return newData;
        }
        return [...prevData, updatedService];
      });
    }
  };

  const fetchAllServices = async (reset = false) => {
    if (selectedServices.length > 0) {
      // Set initial loading states
      setData((prevData) =>
        selectedServices.map((service) => ({
          name: service.provider_name,
          movies: reset
            ? []
            : prevData.find((s) => s.name === service.provider_name)?.movies ||
              [],
          imagePath: service.logo_path,
          page: reset
            ? 1
            : prevData.find((s) => s.name === service.provider_name)?.page || 1,
          isLoading: true,
        }))
      );

      // Fetch for each service independently
      await Promise.all(
        selectedServices.map((service) => fetchServiceMovies(service, 1, reset))
      );
    }
  };

  const loadMore = async (serviceName: string) => {
    const serviceToUpdate = data.find((s) => s.name === serviceName);
    if (serviceToUpdate && !serviceToUpdate.isLoading) {
      // Set loading state for this service
      setData((prevData) =>
        prevData.map((s) =>
          s.name === serviceName ? { ...s, isLoading: true } : s
        )
      );

      const service = selectedServices.find(
        (s) => s.provider_name === serviceName
      );
      if (service) {
        await fetchServiceMovies(service, serviceToUpdate.page + 1);
      }
    }
  };

  useEffect(() => {
    fetchAllServices(true);
  }, []);

  useEffect(() => {
    fetchAllServices(true);
  }, [selectedServices, isRefreshing]);

  return { data, loadMore };
};

export default useFindStreamingMovies;
