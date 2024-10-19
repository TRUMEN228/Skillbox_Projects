import { FC } from "react";
import "./style.css";

interface ITopFilmNumber {
  number: number;
}

export const TopFilmNumber: FC<ITopFilmNumber> = ({
  number
}) => {
  return (
    <div className="top-films__film-number">
      {number}
    </div>
  );
}