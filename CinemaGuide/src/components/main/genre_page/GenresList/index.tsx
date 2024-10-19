import { FC } from "react";
import { GenresListItem } from "../GenresListItem";
import "./style.css";
import { Container } from "../../../general/Container";
import { Loading } from "../../../general/Loading";

interface IGenresList {
  genres: string[];
}

export const GenresList: FC<IGenresList> = ({
  genres
}) => {
  if (!genres.length) {
    return (
      <div>
        <Container>
          <Loading />
        </Container>
      </div>
    );
  }

  return (
    <ul className="list-reset genres-page__list">
      {genres.map((item, index) => (
        <GenresListItem key={index} genre={item}/>
      ))}
    </ul>
  );
}