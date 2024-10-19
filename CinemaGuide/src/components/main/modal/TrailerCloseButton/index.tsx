import { FC } from "react";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";
import "./style.css";

interface ITrailerCloseButton {
  onClick: () => void;
}

export const TrailerCloseButton: FC<ITrailerCloseButton> = ({
  onClick
}) => {
  const isMobile = useMaxWidthQuery(375);

  if (isMobile) {
    return (
      <div onClick={onClick} className="trailer__close-btn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.99873 5.5865L11.9485 0.636719L13.3627 2.05093L8.41293 7.0007L13.3627 11.9504L11.9485 13.3646L6.99873 8.4149L2.04899 13.3646L0.634766 11.9504L5.58453 7.0007L0.634766 2.05093L2.04899 0.636719L6.99873 5.5865Z" fill="black"/>
        </svg>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="trailer__close-btn">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5859 10L0.792969 2.20706L2.20718 0.792847L10.0001 8.5857L17.793 0.792847L19.2072 2.20706L11.4143 10L19.2072 17.7928L17.793 19.2071L10.0001 11.4142L2.20718 19.2071L0.792969 17.7928L8.5859 10Z" fill="#000"/>
      </svg>
    </div>
  );
}