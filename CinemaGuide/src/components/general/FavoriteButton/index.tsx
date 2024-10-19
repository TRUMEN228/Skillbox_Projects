import { FC, ButtonHTMLAttributes } from "react";
import { Button } from "../Button";
import { Movie, User } from "../../../api/types";

interface IFavoriteButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  user?: User;
  film: Movie;
  onAddFavorite: () => void;
  onRemoveFavorite: () => void;
}

export const FavoriteButton: FC<IFavoriteButton> = ({
  user,
  film,
  onAddFavorite,
  onRemoveFavorite,
  ...props
}) => {
  if (user && user.favorites.find(item => item === String(film.id))) {
    return (
      <Button onClick={onRemoveFavorite} kind="secondary" className="favorite__btn" {...props}>
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0Z" fill="#B4A9FF"/>
        </svg>
      </Button>
    );
  }

  return (
    <Button onClick={onAddFavorite} kind="secondary" className="favorite__btn" {...props}>
      <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z" fill="white"/>
      </svg>
    </Button>
  );
}