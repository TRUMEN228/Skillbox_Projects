import React, { FC } from "react";
import { Movie } from "../../../../api/types";
import { Link } from "react-router-dom";
import "./style.css";

interface IGenreFilmsListItem {
  film: Movie;
}

export const GenreFilmsListItem: FC<IGenreFilmsListItem> = ({
  film
}) => {
  const filmBackground: React.CSSProperties = {
    backgroundImage: `url(${film.posterUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  };

  return (
    <li className="genre-page__item" style={filmBackground}>
      <Link to={`/films/${film.id}`}></Link>
    </li>
  );
}