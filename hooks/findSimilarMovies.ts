import { get } from "../api";
import { CastResults } from "../redux/apiSlice";
import { CastMember, CrewMember, Movie } from "../types";

const findSimilarMovies = async (id: number) => {
  const { data: topCrew } = await get<CastResults>(`/movie/${id}/credits`);
  const { data: keywords } = await get<any>(`/movie/${id}/keywords`);
  const { data: movie } = await get<any>(`/movie/${id}`);
  let directorOrDirectors: CrewMember[] = [];
  let writerOrWriters: CrewMember[] = [];
  let actorOrActors: CastMember[] = [];
  if (topCrew) {
    actorOrActors = topCrew.cast.slice(0, 5);
    directorOrDirectors = topCrew.crew.filter(
      (crew) => crew.job.toLocaleUpperCase() === "DIRECTOR"
    );
    writerOrWriters = topCrew.crew.filter(
      (crew) => crew.job.toLocaleUpperCase() === "SCREENPLAY"
    );
  }
  const genreStr = buildIdString(
    (movie.genres.map((value: any) => value.id) || []).slice(0, 2)
  );
  console.log(genreStr);
  const genreMoviePromises = [1, 2].map((value) =>
    get<any>(`/discover/movie`, {
      params: { with_genres: genreStr, page: value },
    })
  );
  const res = await Promise.all(genreMoviePromises);
  let genreMovies = res.map(({ data }) => data.results).flat();
  const map = new Map<Movie, number>();
  for (const gMovie of genreMovies) {
    const { data: simCrew } = await get<CastResults>(
      `movie/${gMovie.id}/credits`
    );
    const { data: simKeywords } = await get<any>(
      `/movie/${gMovie.id}/keywords`
    );
    let score = 0;
    let sim_directorOrDirectors: CrewMember[] = [];
    let sim_writerOrWriters: CrewMember[] = [];
    let sim_actorOrActors: CastMember[] = [];
    if (simCrew) {
      sim_actorOrActors = simCrew.cast.slice(0, 5);
      sim_directorOrDirectors = simCrew.crew.filter(
        (crew) => crew.job.toLocaleUpperCase() === "DIRECTOR"
      );
      sim_writerOrWriters = simCrew.crew.filter(
        (crew) => crew.job.toLocaleUpperCase() === "SCREENPLAY"
      );
    }
    if (simKeywords && keywords) {
      let keyCount = simKeywords.keywords.filter((value: any) =>
        keywords.keywords.map((key: any) => key.id).includes(value.id)
      );
      score += keyCount.length * 3;
    }
    let actorCount = sim_actorOrActors.filter(({ id }) =>
      actorOrActors.map(({ id }) => id).includes(id)
    );
    score += actorCount.length * 5;
    let directorCount = sim_directorOrDirectors.filter(({ id }) =>
      directorOrDirectors.map(({ id }) => id).includes(id)
    );
    score += directorCount.length * 5;
    let writerCount = sim_writerOrWriters.filter(({ id }) =>
      writerOrWriters.map(({ id }) => id).includes(id)
    );
    score += writerCount.length * 5;
    map.set(gMovie, score);
  }
  let sorted = [...map.entries()]
    .sort((a, b) => a[1] - b[1])
    .map((value) => value[0].title);
  console.log(sorted);
};

const buildIdString = (ids: number[]) => {
  return ids
    .map((id, index) => (index === ids.length - 1 ? `${id}` : `${id},`))
    .join("");
};

export default findSimilarMovies;
