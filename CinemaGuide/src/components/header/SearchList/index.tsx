import { FC } from "react";
import { SearchListItem } from "../SearchListItem";
import "./style.css";
import { Movie } from "../../../api/types";

interface ISearchList {
  films: Movie[];
  onClick: () => void;
}

export const SearchList: FC<ISearchList> = ({
  films,
  onClick
}) => {
  if (!films.length) {
    return (
      <p className="search__error">Фильмы не найдены</p>
    );
  }

  return (
    <ul className="list-reset search__list">
      {films.map((item, index) => (
        <SearchListItem film={item} key={index} onClick={onClick} />
      ))}
    </ul>
  );
}