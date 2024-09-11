import { useCallback, useEffect, useState } from "react";
import { Movie, Service } from "../types";
import api from "./instance";

interface ApiResponse<T> {
  data: T;
  error?: string;
}

//Helper function for get requests
export async function get<T>(
  url: string,
  config?: object
): Promise<ApiResponse<T>> {
  try {
    const response = await api.get<T>(url, config);
    return { data: response.data };
  } catch (error: any) {
    return {
      data: undefined as unknown as T,
      error: error.message || "An unexpected error occurred",
    };
  }
}

//TODO: Maybe move into separate hook file
export const useFetchList = (
  url: string,
  isRefreshing: boolean,
  config?: object
) => {
  const [list, setList] = useState<Movie[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    const { data, error: e } = await get<any>(url, config);
    if (data) {
      setList(data.results as Movie[]);
    }
    if (e) {
      setError(e);
    }
    setLoading(false);
  }, [get]);

  useEffect(() => {
    fetchList();
  }, [fetchList, isRefreshing]);

  return { list, error, loading };
};

export const fetchMovieServices = async (id: number) => {
  const { data } = await get<any>(`movie/${id}/watch/providers`, {
    params: { language: "en-US" },
  });
  if (
    data &&
    data.results &&
    data.results["US"] &&
    data.results["US"].flatrate
  ) {
    return data.results["US"].flatrate as Service[];
  }
  return [];
};

export const fetchMovieDetails = async (id: number) => {
  const { data } = await get<any>(`movie/${id}`, {
    params: { language: "en-US" },
  });
  return data || [];
};
