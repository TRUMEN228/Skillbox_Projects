import { FC } from "react";
import { defineFilmClass } from "../Rating";
import "./style.css";

interface IRatingSmall {
  rating: number;
}

export const RatingSmall: FC<IRatingSmall> = ({
  rating
}) => {
  return (
    <div className={`rating-small__container ${defineFilmClass(rating)}-film`}>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.99944 7.60837L2.0605 9.25346L2.71689 5.95L0.244141 3.66329L3.58874 3.26673L4.99944 0.208374L6.4101 3.26673L9.75469 3.66329L7.28198 5.95L7.93835 9.25346L4.99944 7.60837Z" fill="white"/>
      </svg>
      <p className="rating-small__number">{rating.toFixed(1)}</p>
    </div>
  );
}