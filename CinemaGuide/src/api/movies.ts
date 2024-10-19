import { FilterParams, Movie } from "./types";

const URL = "https://cinemaguide.skillbox.cc";

export function getFilteredMovies({
  genre,
  title,
  count,
  page
}: FilterParams): Promise<Movie[]> {
  let NewURL = `${URL}/movie?`;

  if (genre) NewURL += `genre=${genre}`;
  if (title) NewURL += `title=${title}`;
  if (count) NewURL += `count=${count}`;
  if (page) NewURL += `page=${page}`;

  return fetch(`${NewURL}`)
    .then(response => response.json());
}

export function getTopFilms(): Promise<Movie[]> {
  return fetch(`${URL}/movie/top10`)
    .then(response => response.json());
}

export function getGenres(): Promise<string[]> {
  return fetch(`${URL}/movie/genres`)
    .then(response => response.json());
}

export function getMovie(id: string): Promise<Movie> {
  return fetch(`${URL}/movie/${id}`)
    .then(response => response.json());
}

export function getRandomMovie(): Promise<Movie> {
  return fetch(`${URL}/movie/random`)
    .then(response => response.json());
}