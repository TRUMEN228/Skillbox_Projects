import { FC } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../../api/types";
import "./style.css";
import { RatingSmall } from "../../general/RatingSmall";
import useMaxWidthQuery from "../../../hooks/useMediaQuery";

interface ISearchListItem {
  film: Movie;
  onClick: () => void;
}

function getYear(dateStr: string): string {
  const date = new Date(dateStr);

  return date.getFullYear().toString();
}

function getGenres(genres: string[]): string {
  if (!genres.length) {
    return "-";
  }

  return genres.join(", ");
}

function splitTime(minutes: number): string {
  let hours = Math.floor(minutes / 60);

  return `${hours} ч ${minutes - hours * 60} мин`;
}

export const SearchListItem: FC<ISearchListItem> = ({
  film,
  onClick
}) => {
  const isMobile = useMaxWidthQuery(375);

  const imgBackgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${film.posterUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  const handleClick = () => {
    onClick();
  }

  if (isMobile) {
    return (
      <li className="search__item" onClick={handleClick}>
        <Link to={`/films/${film.id}`}>
          <div className="search__item-container">
            <div className="search__item-img" style={imgBackgroundStyle}></div>
            <div className="search__item-content">
              <div className="search__item-top">
                <RatingSmall rating={film.tmdbRating}/>
                <span className="search__item-info">{getYear(film.releaseDate)}</span>
                <span className="search__item-info">{film.genres[0]}</span>
                <span className="search__item-info">{splitTime(film.runtime)}</span>
              </div>
              <div className="search__item-bottom">
                <h2 className="search__item-title">{film.title}</h2>
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li className="search__item" onClick={handleClick}>
      <Link to={`/films/${film.id}`}>
        <div className="search__item-container">
          <div className="search__item-img" style={imgBackgroundStyle}></div>
          <div className="search__item-content">
            <div className="search__item-top">
              <RatingSmall rating={film.tmdbRating}/>
              <span className="search__item-info">{getYear(film.releaseDate)}</span>
              <span className="search__item-info">{getGenres(film.genres)}</span>
              <span className="search__item-info">{splitTime(film.runtime)}</span>
            </div>
            <div className="search__item-bottom">
              <h2 className="search__item-title">{film.title}</h2>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}