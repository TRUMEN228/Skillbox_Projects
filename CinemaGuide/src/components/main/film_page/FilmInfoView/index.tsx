import { FC } from "react";
import { Movie } from "../../../../api/types";
import { Container } from "../../../general/Container";
import { FilmInfo } from "../FilmInfo";
import "./style.css";

interface IFilmInfoView {
  film: Movie;
}

export const FilmInfoView: FC<IFilmInfoView> = ({
  film
}) => {
  return (
    <div className="film-info__container">
      <Container>
        <h2 className="film-info__title">О фильме</h2>
        <FilmInfo film={film} />
      </Container>
    </div>
  );
}