export interface Movie {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime?: number;
  tagline?: string;
  backdrop_path?: string;
  genre_ids?: number[];
  genres?: Genre[];
  revenue?: number;
  production_countries?: { iso_3166_1: string; name: string }[];
  production_companies?: { id: number; logo_path: string; name: string }[];
  original_language?: string;
  budget?: number;
}

export interface Service {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  isRental?: boolean;
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
  Search: undefined;
  MoviesByGenre: { genre: { url: string; name: string } };
  Recs: { recs: Movie[] };
  Movie: { movie: Movie };
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
