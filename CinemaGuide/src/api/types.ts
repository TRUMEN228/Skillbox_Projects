export type User = {
  name: string;
  surname: string;
  email: string;
  favorites: string[];
};

export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  language:	string;
  relaseYear:	number;
  releaseDate: string;
  genres: string[];
  plot:	string;
  runtime: number;
  budget:	string;
  revenue: string;
  homepage:	string;
  status:	string;
  posterUrl: string;
  backdropUrl: string;
  trailerUrl:	string;
  trailerYoutubeId:	string;
  tmdbRating:	number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string;
  awardSummary: string;
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  surname: string;
};

export type AuthInfo = {
  email: string;
  password: string;
}

export type FilterParams = {
  genre?: string;
  title?: string;
  count?: number;
  page?: number;
}