import { FC, useState, useEffect } from "react"
import { Container } from "../../../general/Container";
import "./style.css";
import { GenresList } from "../GenresList";
import { getGenres } from "../../../../api/movies";

export const GenresPage: FC = () => {
  const [genres, setGenres] = useState<string[]>([]);

  const getGenresList = async (): Promise<void> => {
    const data = await getGenres();
    setGenres(data);
  }

  useEffect(() => {
    getGenresList();
  }, []);

  return (
    <div className="genres-page__container">
      <Container>
        <h1 className="genres-page__title">Жанры фильмов</h1>
        <GenresList genres={genres}/>
      </Container>
    </div>
  );
}