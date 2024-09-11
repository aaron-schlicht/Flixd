import { useEffect, useState } from "react";
import { Movie } from "../types";
import { get } from "../api";

const useGetMovieInfo = (id: number) => {
  const [rating, setRating] = useState("");
  const [backdrop, setBackdrop] = useState<string | undefined>(undefined);
  const [tagline, setTagline] = useState<string | undefined>(undefined);
  const [runtime, setRuntime] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const getMovieRating = async () => {
    const { data } = await get<any>(`movie/${id}/release_dates`);
    if (data && data.results) {
      let usRelease = data.results.find(
        (value: any) => value.iso_3166_1 === "US"
      );
      if (usRelease && Boolean(usRelease.release_dates.length)) {
        if (usRelease.release_dates.length > 1) {
          const rting =
            usRelease.release_dates[usRelease.release_dates.length - 1]
              .certification;
          setRating(rting);
        } else {
          const rting = usRelease.release_dates[0].certification;
          setRating(rting);
        }
      }
    }
  };

  const getBackdropAndTagline = async () => {
    setLoading(true);
    const { data } = await get<Movie>(`movie/${id}`);
    setBackdrop(data.backdrop_path);
    setLoading(false);
    setTagline(data.tagline);
    setRuntime(data.runtime || 0);
  };

  useEffect(() => {
    getBackdropAndTagline();
    getMovieRating();
  }, []);

  return {
    rating,
    backdrop,
    tagline,
    runtime,
    loading,
  };
};

export default useGetMovieInfo;
