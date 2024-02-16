import { FC } from "react";
import { Loader } from "../Loader";
import "./PageSelector.css";

interface IPageSelectorProps {
  currentPage: number;
  canSelectNext: boolean;
  canSelectPrev: boolean;
  onNextClick: () => void;
  onPrevClick: () => void;
  isLoading: boolean;
}

export const PageSelector: FC<IPageSelectorProps> = ({
  currentPage,
  onNextClick,
  onPrevClick,
  canSelectNext,
  canSelectPrev,
  isLoading
}) => {
  return (
    <div className="page-selector">
      <button
        disabled={!canSelectPrev}
        className="page-selector__button"
        onClick={onPrevClick}
      >
        {"<"}
      </button>
      <span className="page-selector__page">
        {
          isLoading ? <Loader
            loaderClassName="loader-add"
            loaderItemClassName="loader-item-add"
          /> : currentPage
        }
      </span>

      <button
        disabled={!canSelectNext}
        className="page-selector__button"
        onClick={onNextClick}
      >
        {">"}
      </button>
    </div>
  );
};
