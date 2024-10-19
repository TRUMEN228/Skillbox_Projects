import { FC } from "react";
import { Movie } from "../../../../api/types";
import { FavoriteFilmsListItem } from "../FavoriteFilmsListItem";
import "./style.css";

interface IFavoriteFilmsList {
  films: Movie[];
  onRemoveFavorite: (id: number) => void;
}

export const FavoriteFilmsList: FC<IFavoriteFilmsList> = ({
  films,
  onRemoveFavorite
}) => {
  return (
    <ul className="list-reset account-favorites__list">
      {films.map((item, index) => (
        <FavoriteFilmsListItem film={item} key={index} onRemoveFavorite={onRemoveFavorite} />
      ))}
    </ul>
  );
}