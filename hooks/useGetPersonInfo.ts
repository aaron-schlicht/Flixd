import { Movie } from "../types";
import { useGetPersonCreditsQuery } from "../redux/apiSlice";

const DIRECTOR = "DIRECTOR";
const PRODUCER = "PRODUCER";
const WRITER = "WRITER";

const useGetPersonInfo = (id: number) => {
  const { data: credits, isLoading } = useGetPersonCreditsQuery(id);

  let data: { name: string; movies: Movie[] }[] = [];

  if (credits) {
    const acting = credits.cast.filter((m) => Boolean(m.poster_path));
    const director = credits.crew.filter(
      (m, index) =>
        m.job &&
        m.job.toLocaleUpperCase().includes(DIRECTOR) &&
        Boolean(m.poster_path) &&
        credits.crew.findIndex((item) => item.id === m.id) === index
    );
    const producer = credits.crew.filter(
      (m, index) =>
        m.job &&
        m.job.toLocaleUpperCase().includes(PRODUCER) &&
        Boolean(m.poster_path) &&
        credits.crew.findIndex((item) => item.id === m.id) === index
    );
    const writer = credits.crew.filter(
      (m, index) =>
        m.job &&
        m.job.toLocaleUpperCase().includes(WRITER) &&
        Boolean(m.poster_path) &&
        credits.crew.findIndex((item) => item.id === m.id) === index
    );
    if (Boolean(acting.length)) {
      data.push({
        name: "Actor",
        movies: acting.sort((a, b) => b.popularity - a.popularity),
      });
    }
    if (Boolean(director.length)) {
      data.push({
        name: "Director",
        movies: director.sort((a, b) => b.popularity - a.popularity),
      });
    }
    if (Boolean(producer.length)) {
      data.push({
        name: "Producer",
        movies: producer.sort((a, b) => b.popularity - a.popularity),
      });
    }
    if (Boolean(writer.length)) {
      data.push({
        name: "Writer",
        movies: writer.sort((a, b) => b.popularity - a.popularity),
      });
    }
  }

  return {
    data,
    isLoading,
  };
};

export default useGetPersonInfo;
