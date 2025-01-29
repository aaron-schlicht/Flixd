import { CastMember, CrewMember, Movie } from "../types";
import {
  PersonCreditResults,
  useGetPersonCreditsQuery,
} from "../redux/apiSlice";
import { get } from "../api";
import { useEffect, useState } from "react";

const DIRECTOR = "DIRECTOR";
const PRODUCER = "PRODUCER";
const WRITER = "WRITER";
const SCREENPLAY = "SCREENPLAY";

const useGetPersonInfo = (id: string) => {
  const [credits, setCredits] = useState<{ name: string; movies: Movie[] }[]>(
    []
  );
  const [person, setPerson] = useState<CastMember | CrewMember | null>(null);
  const [loading, setLoading] = useState(false);
  const getPersonInfo = async () => {
    setLoading(true);
    const { data } = await get<PersonCreditResults>(
      `person/${id}/movie_credits`
    );

    const { data: personDetails } = await get(`person/${id}`);

    if (personDetails) {
      setPerson(personDetails as CastMember | CrewMember);
    }
    let results = [];

    if (data) {
      const directing = data.crew.filter(
        (m, index) =>
          m.job &&
          m.job.toLocaleUpperCase().includes(DIRECTOR) &&
          Boolean(m.poster_path) &&
          data.crew.findIndex((item) => item.id === m.id) === index
      );
      if (directing.length) {
        results.push({
          name: "Director",
          movies: directing,
        });
      }
      const writing = data.crew.filter(
        (m, index) =>
          m.job &&
          (m.job.toLocaleUpperCase().includes(WRITER) ||
            m.job.toLocaleUpperCase().includes(SCREENPLAY)) &&
          Boolean(m.poster_path) &&
          data.crew.findIndex((item) => item.id === m.id) === index
      );
      if (writing.length) {
        results.push({
          name: "Writer",
          movies: writing,
        });
      }
      const producing = data.crew.filter(
        (m, index) =>
          m.job &&
          m.job.toLocaleUpperCase().includes(PRODUCER) &&
          Boolean(m.poster_path) &&
          data.crew.findIndex((item) => item.id === m.id) === index
      );
      if (producing.length) {
        results.push({ name: "Producer", movies: producing });
      }
      const acting = data.cast.filter((m) => Boolean(m.poster_path));
      if (acting.length) {
        results.push({
          name: "Actor",
          movies: acting,
        });
      }
    }
    setCredits(results);
    setLoading(false);
  };

  useEffect(() => {
    getPersonInfo();
  }, []);

  return {
    credits,
    person,
    loading,
  };
};

export default useGetPersonInfo;
