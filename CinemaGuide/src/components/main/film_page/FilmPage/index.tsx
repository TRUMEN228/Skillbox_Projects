import { FC, useState, useEffect } from "react";
import { FilmInfoView } from "../FilmInfoView";
import { FilmHeader } from "../FilmHeader";
import { useParams } from "react-router-dom";
import { Movie, User } from "../../../../api/types";
import { getMovie } from "../../../../api/movies";
import { Loading } from "../../../general/Loading";
import { addFavorite, removeFavorite } from "../../../../api/favorites";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../api/queryClient";
import "./style.css";

interface IFilmPage {
  user?: User;
  onModalOpen: () => void;
  onTrailerOpen: (film: Movie) => void;
  onRefetchUser: () => void;
}

export const FilmPage: FC<IFilmPage> = ({
  user,
  onModalOpen,
  onTrailerOpen,
  onRefetchUser
}) => {
  const { filmId } = useParams();
  const [film, setFilm] = useState<Movie>();

  const addFavoriteMutation = useMutation({
    mutationFn: () => addFavorite(String(film?.id)),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorite", "add", film?.id] })
    }
  }, queryClient);

  const removeFavoriteMutation = useMutation({
    mutationFn: () => removeFavorite(film?.id!),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorite", "remove", film?.id] })
    }
  }, queryClient);

  const getFilm = async (): Promise<void> => {
    const data = await getMovie(filmId!);
    setFilm(data);
  }

  const openTrailer = () => {
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
    if (filmId) {
      getFilm();
    }
  }, [filmId]);

  if (!film) {
    return (
      <Loading />
    );
  }

  return (
    <div className="film-page__container">
      <FilmHeader
        film={film!}
        user={user}
        onTrailer={openTrailer}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />
      <FilmInfoView film={film!}/>
    </div>
  );
}