import { FC } from "react";
import { Container } from "../../../general/Container";
import { TopFilmsList } from "../TopFilmsList";
import { Movie } from "../../../../api/types";
import "./style.css";
import { Loading } from "../../../general/Loading";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";

interface ITopFilmsView {
  films: Movie[];
}

export const TopFilmsView: FC<ITopFilmsView> = ({
  films
}) => {
  const isMobile = useMaxWidthQuery(375);

  if (!films.length) {
    return (
      <Loading />
    );
  }

  if (isMobile) {
    return (
      <div className="top-films__container">
        <Container>
          <h2 className="top-films__title">Топ 10 фильмов</h2>
        </Container>
        <div className="top-films__list-container">
          <TopFilmsList films={films} />
        </div>
      </div>
    );
  }

  return (
    <div className="top-films__container">
      <Container>
        <h2 className="top-films__title">Топ 10 фильмов</h2>
        <TopFilmsList films={films} />
      </Container>
    </div>
  );
}