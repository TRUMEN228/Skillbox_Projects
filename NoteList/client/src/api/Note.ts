import { z } from "zod";
import { validateResponse } from "./validateResponse";

export const NoteScheme = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  userId: z.string(),
  createdAt: z.number()
});

export type Note = z.infer<typeof NoteScheme>;

export const NoteListScheme = z.array(NoteScheme);

export type NoteList = z.infer<typeof NoteListScheme>;

export const FetchNoteListResponseScheme = z.object({
  list: NoteListScheme,
  pageCount: z.number()
});

export type FetchNoteListResponse = z.infer<typeof FetchNoteListResponseScheme>;

interface FetchNoteListParams {
  page: number;
  pageSize: number;
  searchString?: string;
}

export function fetchNoteList(
  params: FetchNoteListParams
): Promise<FetchNoteListResponse> {
  const { page, pageSize, searchString } = params;
  let url = `/api/notes?page=${page}&pageSize=${pageSize}`;

  if (searchString) {
    url += `&searchString=${searchString}`;
  }

  return fetch(url)
    .then(validateResponse)
    .then(response => response.json())
    .then(data => FetchNoteListResponseScheme.parse(data));
}

export function createNote(title: string, text: string): Promise<void> {
  return fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, text })
  })
    .then(validateResponse)
    .then(() => undefined);
}