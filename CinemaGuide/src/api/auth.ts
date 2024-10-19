import { RegisterData } from "./types";
import { User } from "./types";
import { AuthInfo } from "./types";
import { validateResponse } from "./validateResponse";

const URL = "https://cinemaguide.skillbox.cc";

export function login({email, password}: AuthInfo): Promise<void> {
  return fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, password
    }),
    credentials: "include"
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function logout(): Promise<void> {
  return fetch(`${URL}/auth/logout`, {
    credentials: "include"
  })
    .then(() => undefined);
}

export function registerUser({email, password, name, surname}: RegisterData): Promise<void> {
  return fetch(`${URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email, password, name, surname
    })
  })
    .then(validateResponse)
    .then(() => undefined);
}

export function getAuthorisedUser(): Promise<User> {
  return fetch(`${URL}/profile`, {
    credentials: "include"
  })
    .then(response => response.json());
}