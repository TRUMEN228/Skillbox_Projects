import { FC, HTMLAttributes } from "react";
import "./style.css";

interface ITrailerButton extends HTMLAttributes<HTMLButtonElement> {
  state: "pause" | "play" | "loading";
  onPause: () => void;
  onPlay: () => void;
}

export const TrailerButton: FC<ITrailerButton> = ({
  state,
  onPause,
  onPlay,
  ...props
}) => {
  switch (state) {
    case "play":
      return (
        <button
          className="btn-reset trailer__btn"
          onClick={onPause}
          {...props}
        >
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H3.33333V30H0V0ZM16.6667 0H20V30H16.6667V0Z" fill="black"/>
          </svg>
        </button>
      );
    case "pause":
      return (
        <button
          className="btn-reset trailer__btn"
          onClick={onPlay}
          {...props}
        >
          <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 29.6595V2.34035C0 1.0313 1.43992 0.23322 2.55 0.92702L24.4053 14.5867C25.4498 15.2393 25.4498 16.7605 24.4053 17.4133L2.55 31.0728C1.43992 31.7667 0 30.9687 0 29.6595Z" fill="black"/>
          </svg>
        </button>
      );
    case "loading":
      return (
        <div className="trailer__loading">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.6067 4.3934L23.2495 6.75042C21.1383 4.63917 18.2217 3.33333 15 3.33333C8.55668 3.33333 3.33333 8.55668 3.33333 15C3.33333 21.4433 8.55668 26.6667 15 26.6667C21.4433 26.6667 26.6667 21.4433 26.6667 15H30C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C19.1422 0 22.8922 1.67893 25.6067 4.3934Z" fill="#fff"/>
          </svg>
        </div>
      );
  }
}