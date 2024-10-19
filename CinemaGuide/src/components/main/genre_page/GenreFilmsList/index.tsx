import { FC } from "react";
import { Movie } from "../../../../api/types";
import { GenreFilmsListItem } from "../GenreFilmsListItem";
import "./style.css";

interface IGenreFilmsList {
  films: Movie[];
  filmsPerPage: number
}

export const GenreFilmsList: FC<IGenreFilmsList> = ({
  films,
  filmsPerPage
}) => {
  let filmsView = films.slice(0, filmsPerPage);

  return (
    <ul className="list-reset genre-page__list">
      {filmsView.map((item, index) => (
        <GenreFilmsListItem key={index} film={item}/>
      ))}
    </ul>
  );
}