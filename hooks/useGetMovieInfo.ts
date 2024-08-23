import { useEffect, useState } from "react";
import { FullMovie } from "../types";
import { get } from "../api";

//TODO: Put this behind loading state (block page rendering until backdrop is settled)
const useGetMovieInfo = (id: number) => {
  const [rating, setRating] = useState("");
  const [backdrop, setBackdrop] = useState<string | undefined>(undefined);
  const [tagline, setTagline] = useState<string | undefined>(undefined);
  const [runtime, setRuntime] = useState<number>(0);

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
    const { data } = await get<FullMovie>(`movie/${id}`);
    setBackdrop(data.backdrop_path);
    setTagline(data.tagline);
    setRuntime(data.runtime || 0);
  };

  useEffect(() => {
    getMovieRating();
    getBackdropAndTagline();
  }, []);

  return {
    rating,
    backdrop,
    tagline,
    runtime,
  };
};

export default useGetMovieInfo;
