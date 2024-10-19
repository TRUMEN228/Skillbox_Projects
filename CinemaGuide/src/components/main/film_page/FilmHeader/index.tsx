import { FC } from "react";
import { Movie, User } from "../../../../api/types";
import { Rating } from "../../../general/Rating";
import { Button } from "../../../general/Button";
import { Container } from "../../../general/Container";
import { FavoriteButton } from "../../../general/FavoriteButton";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";
import "./style.css";

interface IFilmHeader {
  film: Movie;
  user?: User;
  onTrailer: () => void;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
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

export const FilmHeader: FC<IFilmHeader> = ({
  film,
  user,
  onTrailer,
  onAddFavorite,
  onRemoveFavorite
}) => {
  const isMobile = useMaxWidthQuery(375);

  const filmBackground: React.CSSProperties = {
    backgroundImage: `url(${film.backdropUrl})`,
    backgroundPosition: "right 0",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  };

  if (isMobile) {
    return (
      <>
        {
          film.backdropUrl ?
          <img src={film.backdropUrl} alt={film.title} /> :
          <Container>
            <span style={{
              display: "flex",
              height: "150px",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255, 255, 255, 0.3)",
              fontSize: "30px",
              lineHeight: "40px"
            }}>Нет изображения</span>
          </Container>
        }
        <Container>
          <div className="film-header__info">
            <div className="film-header__category">
              <Rating rating={film.tmdbRating}/>
              <span className="film-header__category-info">{getYear(film.releaseDate)}</span>
              <span className="film-header__category-info">{film.genres[0]}</span>
              <span className="film-header__category-info">{splitTime(film.runtime)}</span>
            </div>
            <div className="film-header__head">
              <h2 className="film-header__title">{film.title}</h2>
              <p className="film-header__descr">{film.plot}</p>
            </div>
            <div className="film-header__control">
              <Button onClick={onTrailer} className="film-header__trailer-btn">Трейлер</Button>
              <FavoriteButton
                className="film-header__favorite-btn"
                user={user}
                film={film}
                onAddFavorite={onAddFavorite}
                onRemoveFavorite={onRemoveFavorite}
              />
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <div className="film-header__container" style={filmBackground}>
      <Container>
        <div className="film-header__info">
          <div className="film-header__category">
            <Rating rating={film.tmdbRating}/>
            <span className="film-header__category-info">{getYear(film.releaseDate)}</span>
            <span className="film-header__category-info">{getGenres(film.genres)}</span>
            <span className="film-header__category-info">{splitTime(film.runtime)}</span>
          </div>
          <div className="film-header__head">
            <h2 className="film-header__title">{film.title}</h2>
            <p className="film-header__descr">{film.plot}</p>
          </div>
          <div className="film-header__control">
            <Button onClick={onTrailer}>Трейлер</Button>
            <FavoriteButton
              user={user}
              film={film}
              onAddFavorite={onAddFavorite}
              onRemoveFavorite={onRemoveFavorite}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}