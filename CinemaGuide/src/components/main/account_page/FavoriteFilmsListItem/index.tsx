import { FC } from "react";
import { Movie } from "../../../../api/types";
import "./style.css";
import { Link } from "react-router-dom";
import { FavoriteRemoveButton } from "../FavoriteRemoveButton";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";

interface IFavoriteFilmsListItem {
  film: Movie;
  onRemoveFavorite: (id: number) => void;
}

export const FavoriteFilmsListItem: FC<IFavoriteFilmsListItem> = ({
  film,
  onRemoveFavorite
}) => {
  const isMobile = useMaxWidthQuery(375);

  const filmBackground: React.CSSProperties = {
    backgroundImage: `url(${film.posterUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }

  const handleRemoveFavorite = () => {
    onRemoveFavorite(film.id);
  }

  if (isMobile) {
    return (
      <li className="account-favorites__item" style={filmBackground}>
        <Link to={`/films/${film.id}`}>
        </Link>
      </li>
    );
  }

  return (
    <li className="account-favorites__item" style={filmBackground}>
      <Link to={`/films/${film.id}`}>
      </Link>
      <FavoriteRemoveButton onClick={handleRemoveFavorite} />
    </li>
  );
}