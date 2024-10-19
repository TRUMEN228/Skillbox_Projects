import { FC } from "react";
import "./style.css";

interface IFavoriteRemoveButton {
  onClick: () => void;
}

export const FavoriteRemoveButton: FC<IFavoriteRemoveButton> = ({
  onClick
}) => {
  return (
    <div onClick={onClick} className="favorite-remove__btn">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99873 5.5865L11.9485 0.636719L13.3627 2.05093L8.41293 7.0007L13.3627 11.9504L11.9485 13.3646L6.99873 8.4149L2.04899 13.3646L0.634766 11.9504L5.58453 7.0007L0.634766 2.05093L2.04899 0.636719L6.99873 5.5865Z" fill="black"/>
      </svg>
    </div>
  );
}