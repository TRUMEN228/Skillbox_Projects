import { FC, useState, useEffect } from "react";
import { User, Movie } from "../../../../api/types";
import { getFavorites, removeFavorite } from "../../../../api/favorites";
import { FavoriteFilmsList } from "../FavoriteFilmsList";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../api/queryClient";
import "./style.css";

interface IAccountFavoritesPage {
  user: User;
  refetchUser: () => void;
}

export const AccountFavoritesPage: FC<IAccountFavoritesPage> = ({
  user,
  refetchUser
}) => {
  const [filmList, setFilmList] = useState<Movie[]>([]);

  const removeFavoriteMutation = useMutation({
    mutationFn: (data: {id: number}) => removeFavorite(data.id)
  }, queryClient);

  const getFilms = async (): Promise<void> => {
    const data = await getFavorites();
    setFilmList(data);
  }

  const handleRemoveFavorite = (id: number) => {
    removeFavoriteMutation.mutate({ id });

    if (removeFavoriteMutation.isSuccess) {
      refetchUser();
      getFilms();
    }
  }

  useEffect(() => {
    getFilms();
  }, []);

  if (!user.favorites.length) {
    return (
      <div className="account-favorites__container">
        <p className="account-favorites__empty">Нет избранных фильмов</p>
      </div>
    );
  }

  return (
    <div className="account-favorites__container">
      <FavoriteFilmsList films={filmList} onRemoveFavorite={handleRemoveFavorite} />
    </div>
  );
}