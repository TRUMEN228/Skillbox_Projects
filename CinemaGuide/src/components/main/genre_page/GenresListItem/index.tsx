import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Movie } from "../../../../api/types";
import { getFilteredMovies } from "../../../../api/movies";

interface IGenresListItem {
  genre: string;
}

function makeNameFromStr(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export const GenresListItem: FC<IGenresListItem> = ({
  genre
}) => {
  const [film, setFilm] = useState<Movie>();

  const getGenreFilm = async (): Promise<void> => {
    const data = await getFilteredMovies({genre: genre});
    setFilm(data[30]);
  }

  useEffect(() => {
    getGenreFilm();
  }, [])

  const genreBackground: React.CSSProperties = {
    backgroundImage: `url(${film?.backdropUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  };

  return (
    <li className="genres-page__item">
      <Link to={`/genres/${genre}`}>
        <div className="genres-page__item-image" style={genreBackground}></div>
        <div className="genres-page__item-name">
          {makeNameFromStr(genre)}
        </div>
      </Link>
    </li>
  );
}