import { FC } from "react";
import { Movie, User } from "../../../../api/types";
import { Rating } from "../../../general/Rating";
import { Button } from "../../../general/Button";
import { Container } from "../../../general/Container";
import { Link } from "react-router-dom";
import { Loading } from "../../../general/Loading";
import { FavoriteButton } from "../../../general/FavoriteButton";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";
import "./style.css";

interface IRandomFilmView {
  film?: Movie;
  user?: User;
  onTrailer: () => void;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
  onReload: () => void;
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

export const RandomFilmView: FC<IRandomFilmView> = ({
  film,
  user,
  onTrailer,
  onAddFavorite,
  onRemoveFavorite,
  onReload
}) => {
  const isMobile = useMaxWidthQuery(375);

  if (!film) {
    return (
      <Loading />
    );
  }

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
          <div className="random-film__info">
            <div className="random-film__category">
              <Rating rating={film.tmdbRating}/>
              <span className="random-film__category-info">{getYear(film.releaseDate)}</span>
              <span className="random-film__category-info">{film.genres[0]}</span>
              <span className="random-film__category-info">{splitTime(film.runtime)}</span>
            </div>
            <div className="random-film__head">
              <h2 className="random-film__title">{film.title}</h2>
              <p className="random-film__descr">{film.plot}</p>
            </div>
            <div className="random-film__control">
              <Button onClick={onTrailer} className="random-film__trailer-btn">Трейлер</Button>
              <div className="random-film__control-bottom">
                <Link style={{borderRadius: "28px"}} to={`/films/${film.id}`}>
                  <Button kind="secondary" className="random-film__about-btn">
                    О фильме
                  </Button>
                </Link>
                <FavoriteButton
                  user={user}
                  film={film}
                  onAddFavorite={onAddFavorite}
                  onRemoveFavorite={onRemoveFavorite}
                />
                <Button onClick={onReload} kind="secondary" className="update__btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z" fill="white"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }

  return (
    <div className="random-film__container" style={filmBackground}>
      <Container>
        <div className="random-film__info">
          <div className="random-film__category">
            <Rating rating={film.tmdbRating}/>
            <span className="random-film__category-info">{getYear(film.releaseDate)}</span>
            <span className="random-film__category-info">{getGenres(film.genres)}</span>
            <span className="random-film__category-info">{splitTime(film.runtime)}</span>
          </div>
          <div className="random-film__head">
            <h2 className="random-film__title">{film.title}</h2>
            <p className="random-film__descr">{film.plot}</p>
          </div>
          <div className="random-film__control">
            <Button onClick={onTrailer}>Трейлер</Button>
            <Link style={{borderRadius: "28px"}} to={`/films/${film.id}`}>
              <Button kind="secondary">
                О фильме
              </Button>
            </Link>
            <FavoriteButton
              user={user}
              film={film}
              onAddFavorite={onAddFavorite}
              onRemoveFavorite={onRemoveFavorite}
            />
            <Button onClick={onReload} kind="secondary" className="update__btn">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z" fill="white"/>
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}