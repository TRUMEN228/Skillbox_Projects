import { FC } from "react";
import { Movie } from "../../../../api/types";
import "./style.css";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";

interface IFilmInfo {
  film: Movie;
}

function splitMoneySum(budget: string): string {
  if (!budget) {
    return "-";
  }

  return Number(budget).toLocaleString('ru-RU') + " $";
}

function checkStringEmpty(str: string): string {
  return str ? str : "-";
}

export const FilmInfo: FC<IFilmInfo> = ({
  film
}) => {
  const isMobile = useMaxWidthQuery(375);

  if (isMobile) {
    return (
      <div className="film-info__table">
        <div className="film-info__row">
          <div className="film-info__row-title">Язык оригинала</div>
          <div className="film-info__row-value">{checkStringEmpty(film.language)}</div>
        </div>
        <div className="film-info__row">
          <div className="film-info__row-title">Бюджет</div>
          <div className="film-info__row-value">{splitMoneySum(film.budget)}</div>
        </div>
        <div className="film-info__row">
          <div className="film-info__row-title">Выручка</div>
          <div className="film-info__row-value">{splitMoneySum(film.revenue)}</div>
        </div>
        <div className="film-info__row">
          <div className="film-info__row-title">Режиссёр</div>
          <div className="film-info__row-value">{checkStringEmpty(film.director)}</div>
        </div>
        <div className="film-info__row">
          <div className="film-info__row-title">Продакшен</div>
          <div className="film-info__row-value">{checkStringEmpty(film.production)}</div>
        </div>
        <div className="film-info__row">
          <div className="film-info__row-title">Награды</div>
          <div className="film-info__row-value">{checkStringEmpty(film.awardSummary)}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="film-info__table">
      <div className="film-info__row">
        <div className="film-info__row-left">
          <div className="film-info__row-title">Язык оригинала</div>
          <div className="film-info__row-dots"></div>
        </div>
        <div className="film-info__row-value">{checkStringEmpty(film.language)}</div>
      </div>
      <div className="film-info__row">
        <div className="film-info__row-left">
          <div className="film-info__row-title">Бюджет</div>
          <div className="film-info__row-dots"></div>
        </div>
        <div className="film-info__row-value">{splitMoneySum(film.budget)}</div>
      </div>
      <div className="film-info__row">
        <div className="film-info__row-left">
          <div className="film-info__row-title">Выручка</div>
          <div className="film-info__row-dots"></div>
        </div>
        <div className="film-info__row-value">{splitMoneySum(film.revenue)}</div>
      </div>
      <div className="film-info__row">
        <div className="film-info__row-left">
          <div className="film-info__row-title">Режиссёр</div>
          <div className="film-info__row-dots"></div>
        </div>
        <div className="film-info__row-value">{checkStringEmpty(film.director)}</div>
      </div>
      <div className="film-info__row">
        <div className="film-info__row-left">
          <div className="film-info__row-title">Продакшен</div>
          <div className="film-info__row-dots"></div>
        </div>
        <div className="film-info__row-value">{checkStringEmpty(film.production)}</div>
      </div>
      <div className="film-info__row">
        <div className="film-info__row-left">
          <div className="film-info__row-title">Награды</div>
          <div className="film-info__row-dots"></div>
        </div>
        <div className="film-info__row-value">{checkStringEmpty(film.awardSummary)}</div>
      </div>
    </div>
  );
}