import { FC, useEffect, useState } from "react";
import { RandomFilmView } from "../RandomFilmView";
import { TopFilmsView } from "../TopFilmsView";
import { getRandomMovie, getTopFilms } from "../../../../api/movies";
import { Movie, User } from "../../../../api/types";
import { Loading } from "../../../general/Loading";
import { addFavorite, removeFavorite } from "../../../../api/favorites";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../api/queryClient";

interface IMainPage {
  user?: User;
  onModalOpen: () => void;
  onTrailerOpen: (film: Movie) => void;
  onRefetchUser: () => void;
}

export const MainPage: FC<IMainPage> = ({
  user,
  onModalOpen,
  onTrailerOpen,
  onRefetchUser
}) => {
  const [film, setFilm] = useState<Movie>();
  const [topFilmsList, setTopFilmsList] = useState<Movie[]>([]);

  const addFavoriteMutation = useMutation({
    mutationFn: () => addFavorite(String(film?.id))
  }, queryClient);

  const removeFavoriteMutation = useMutation({
    mutationFn: () => removeFavorite(film?.id!)
  }, queryClient);

  const getRandomFilm = async (): Promise<void> => {
    const data = await getRandomMovie();
    setFilm(data);
  }

  const getTopFilmsList = async (): Promise<void> => {
    const data = await getTopFilms();
    setTopFilmsList(data);
  }

  const handleOpenTrailer = () => {
    onTrailerOpen(film!);
  }

  const handleAddFavorite = () => {
    if (!user) {
      onModalOpen();
      return;
    }

    addFavoriteMutation.mutate();

    if (addFavoriteMutation.isSuccess) {
      onRefetchUser();
    }
  }

  const handleRemoveFavorite = () => {
    removeFavoriteMutation.mutate();

    if (removeFavoriteMutation.isSuccess) {
      onRefetchUser();
    }
  }

  useEffect(() => {
    getRandomFilm();
    getTopFilmsList();
  }, []);

  if (!film && !topFilmsList.length) {
    return (
      <div className="main-page__container">
        <Loading />
      </div>
    );
  }

  return (
    <div className="main-page__container">
      <RandomFilmView
        film={film}
        user={user}
        onTrailer={handleOpenTrailer}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        onReload={getRandomFilm}
      />
      <TopFilmsView films={topFilmsList}/>
    </div>
  );
}