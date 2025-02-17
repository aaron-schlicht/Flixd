import { CastMember, CrewMember, Movie } from "../types";
import {
  PersonCreditResults,
  PersonDetails,
  useGetPersonCreditsQuery,
} from "../redux/apiSlice";
import { get } from "../api";
import { useEffect, useState } from "react";
import { Credit } from "../screens/PersonScreen/types";

const DIRECTOR = "DIRECTOR";
const PRODUCER = "PRODUCER";
const WRITER = "WRITER";
const SCREENPLAY = "SCREENPLAY";

interface UseGetPersonInfoResult {
  person: PersonDetails | null;
  credits: Credit[];
}

const useGetPersonInfo = (id: string): UseGetPersonInfoResult => {
  const [credits, setCredits] = useState<{ name: string; movies: Movie[] }[]>(
    []
  );
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const getPersonInfo = async () => {
    setLoading(true);
    const { data } = await get<PersonCreditResults>(
      `person/${id}/movie_credits`
    );

    const { data: personDetails } = await get<PersonDetails>(`person/${id}`);

    if (personDetails) {
      setPerson(personDetails);
    }
    let results = [];

    if (data) {
      const filterUniqueMovies = (movies: any[]) => {
        const processedMovies = new Set<number>();
        return movies.filter((movie) => {
          if (processedMovies.has(movie.id)) {
            return false;
          }
          processedMovies.add(movie.id);
          return Boolean(movie.poster_path);
        });
      };

      const directing = filterUniqueMovies(
        data.crew
          .filter((m) => m.job?.toLocaleUpperCase().includes(DIRECTOR))
          .sort((a, b) => b.popularity - a.popularity)
      );
      if (directing.length) {
        results.push({ name: "Director", movies: directing });
      }

      const writing = filterUniqueMovies(
        data.crew
          .filter(
            (m) =>
              m.job?.toLocaleUpperCase().includes(WRITER) ||
              m.job?.toLocaleUpperCase().includes(SCREENPLAY)
          )
          .sort((a, b) => b.popularity - a.popularity)
      );
      if (writing.length) {
        results.push({ name: "Writer", movies: writing });
      }

      // Filter producing credits
      const producing = filterUniqueMovies(
        data.crew
          .filter((m) => m.job?.toLocaleUpperCase().includes(PRODUCER))
          .sort((a, b) => b.popularity - a.popularity)
      );
      if (producing.length) {
        results.push({ name: "Producer", movies: producing });
      }

      // Filter acting credits
      const acting = filterUniqueMovies(data.cast).sort(
        (a, b) => b.popularity - a.popularity
      );
      if (acting.length) {
        results.push({
          name: "Actor",
          movies: acting,
        });
      }
    }
    setCredits(results);
  };

  useEffect(() => {
    getPersonInfo().finally(() => setLoading(false));
  }, []);

  return {
    credits,
    person,
  };
};

export default useGetPersonInfo;
