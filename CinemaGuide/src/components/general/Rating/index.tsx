import { FC } from "react";
import "./style.css";

interface IRating {
  rating: number;
}

export function defineFilmClass(rating: number): string {
  const COOL = 8.5;
  const GOOD = 7;
  const AVERAGE = 5;

  if (rating >= COOL) {
    return "cool";
  } else if (rating < COOL && rating >= GOOD) {
    return "good";
  } else if (rating < GOOD && rating >= AVERAGE) {
    return "average";
  }

  return "below-average";
}

export const Rating: FC<IRating> = ({
  rating
}) => {
  return (
    <div className={`rating__container ${defineFilmClass(rating)}-film`}>
      <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z" fill="white"/>
      </svg>
      <p className="rating__number">{rating.toFixed(1)}</p>
    </div>
  );
}