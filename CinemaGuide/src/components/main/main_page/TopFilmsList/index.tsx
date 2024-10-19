import { FC } from "react";
import { Movie } from "../../../../api/types";
import { TopFilmsListItem } from "../TopFilmsListItem";
import "./style.css";

interface ITopFilmsList {
  films: Movie[];
}

export const TopFilmsList: FC<ITopFilmsList> = ({
  films
}) => {
  return (
    <ul className="list-reset top-films__list">
      {films.map((item, index) => (
        <TopFilmsListItem
          key={index}
          film={item}
          index={index}
        />
      ))}
    </ul>
  );
}