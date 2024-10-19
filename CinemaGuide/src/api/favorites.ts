import { Movie } from "./types";
import { validateResponse } from "./validateResponse";

const URL = "https://cinemaguide.skillbox.cc";

export function getFavorites(): Promise<Movie[]> {
  return fetch(`${URL}/favorites`, {
    credentials: "include"
  })
    .then(response => response.json());
}

export function addFavorite(id: string): Promise<void> {
  return fetch(`${URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id
    }),
    credentials: "include"
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function removeFavorite(id: number): Promise<void> {
  return fetch(`${URL}/favorites/${id}`, {
    method: "DELETE",
    credentials: "include"
  })
    .then(validateResponse)
    .then(() => undefined);
}