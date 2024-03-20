export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  release_date: string;
  serviceIds?: number[];
  genre_ids?: number[];
}

export interface FullMovie {
  id: number;
  title: string;
  overview?: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  release_date: string;
  runtime?: number;
  tagline?: string;
  services?: Service[];
  backdrop_path?: string;
  genres?: Genre[];
}

export interface Service {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface WatchProvider {
  provider_id: number;
  name: string;
  logo_url: string;
}

export interface CastMember {
  id: number;
  name: string;
  profile_path?: string;
  character: string;
}

export interface CrewMember {
  id: number;
  name: string;
  profile_path?: string;
  job: string;
}

export interface Person {
  id: number;
  name: string;
  profile_path?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Flow: undefined;
  Recs: { recs: Movie[] };
  Movie: { id: number };
  Person: { person: Person };
};

export interface Keyword {
  name: string;
  id: number;
}

export interface Genre {
  name: string;
  id: number;
}
