import { FC, useState, useEffect } from "react";
import { Container } from "../../../general/Container";
import { Link, useParams } from "react-router-dom";
import { Movie } from "../../../../api/types";
import { getFilteredMovies } from "../../../../api/movies";
import { GenreFilmsList } from "../GenreFilmsList";
import { Button } from "../../../general/Button";
import { Loading } from "../../../general/Loading";
import "./style.css";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";


function makeNameFromStr(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

export const GenreFilmsPage: FC = () => {
  const { genre } = useParams();
  const [films, setFilms] = useState<Movie[]>([]);
  const [filmsPerPage, setFilmsPerPage] = useState<number>(15);
  const [display, setDisplay] = useState<"block" | "none">("block");
  const isMobile = useMaxWidthQuery(375);

  const getGenreFilms = async (): Promise<void> => {
    const data = await getFilteredMovies({genre: genre});
    setFilms(data);
  }

  useEffect(() => {
    if (genre) {
      getGenreFilms();
    }
  }, []);

  const showMore = () => {
    setFilmsPerPage(filmsPerPage + 10);

    if (filmsPerPage >= films.length) {
      setDisplay("none");
      return;
    }
  }

  if (!films.length) {
    return (
      <div className="genre-page__container">
        <Container>
          <h1 className="genre-page__title">
            <Link to="/genres">
              {
                isMobile ?
                <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.43819 9.00093L11.0379 15.6005L9.15233 17.4861L0.666992 9.00093L9.15233 0.515625L11.0379 2.40124L4.43819 9.00093Z" fill="white"/>
                </svg> :
                <svg width="13" height="21" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.8284 7.0007L7.7782 11.9504L6.364 13.3646L0 7.0007L6.364 0.636719L7.7782 2.05093L2.8284 7.0007Z" fill="#fff"/>
                </svg>
              }
              {makeNameFromStr(genre!)}
            </Link>
          </h1>
          <Loading />
        </Container>
      </div>
    )
  }

  return (
    <div className="genre-page__container">
      <Container>
        <h1 className="genre-page__title">
          <Link to="/genres">
            <svg width="13" height="21" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.8284 7.0007L7.7782 11.9504L6.364 13.3646L0 7.0007L6.364 0.636719L7.7782 2.05093L2.8284 7.0007Z" fill="#fff"/>
            </svg>
            {makeNameFromStr(genre!)}
          </Link>
        </h1>
        <GenreFilmsList films={films} filmsPerPage={filmsPerPage}/>
        <Button className="genre-page__btn" onClick={showMore} display={display}>Показать ещё</Button>
      </Container>
    </div>
  );
}