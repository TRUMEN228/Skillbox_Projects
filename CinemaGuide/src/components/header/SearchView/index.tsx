import { FC } from "react";
import { SearchList } from "../SearchList";
import { Movie } from "../../../api/types";
import ReactModal from "react-modal";
import "./style.css";

interface ISearchView {
  display: "flex" | "none";
  films: Movie[];
  onClick: () => void;
}

ReactModal.setAppElement("#root");

export const SearchView: FC<ISearchView> = ({
  display,
  films,
  onClick,
}) => {
  const VISIBLE_FILMS = 5;

  films = films.slice(0, VISIBLE_FILMS);

  const searchStyle: React.CSSProperties = {
    display: display
  };

  return (
    <div className="search__container" style={searchStyle}>
      <SearchList films={films} onClick={onClick} />
    </div>
  );
}