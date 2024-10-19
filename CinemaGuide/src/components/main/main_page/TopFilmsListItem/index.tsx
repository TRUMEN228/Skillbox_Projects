import { FC } from "react";
import { Movie } from "../../../../api/types";
import { TopFilmNumber } from "../TopFilmNumber";
import "./style.css";
import { Link } from "react-router-dom";

interface ITopFilmsListItem {
  film: Movie;
  index: number;
}

export const TopFilmsListItem: FC<ITopFilmsListItem> = ({
  film,
  index
}) => {
  const filmBackground: React.CSSProperties = {
    backgroundImage: `url(${film.posterUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  };

  return (
    <li className="top-films__item" style={filmBackground}>
      <Link to={`/films/${film.id}`}>
        <TopFilmNumber number={index + 1}/>
      </Link>
    </li>
  );
}