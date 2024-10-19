import { FC } from "react";
import { Link } from "react-router-dom";
import { HeaderSearch } from "../HeaderSearch";
import "./style.css";
import useMaxWidthQuery from "../../../hooks/useMediaQuery";

interface IHeaderNavBar {
  state: "main" | "genres" | "account";
  onStateChange: (state: "main" | "genres" | "account") => void;
  onSearchOpen?: () => void;
}

export const HeaderNavBar: FC<IHeaderNavBar> = ({
  state,
  onStateChange,
  onSearchOpen
}) => {
  const isMobile = useMaxWidthQuery(375);

  const mainClass = state === "main" ? "header__nav-item choosen" : "header__nav-item";
  const genresClass = state === "genres" ? "header__nav-item choosen" : "header__nav-item";

  const handleStateChange = (state: "main" | "genres" | "account") => {
    onStateChange(state);
  }

  if (isMobile) {
    return (
      <nav className="header__nav">
        <ul className="list-reset header__nav-list">
          <li className="header__nav-item">
            <Link to={"/genres"}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9.5C2.51472 9.5 0.5 7.48528 0.5 5C0.5 2.51472 2.51472 0.5 5 0.5C7.48528 0.5 9.5 2.51472 9.5 5C9.5 7.48528 7.48528 9.5 5 9.5ZM5 19.5C2.51472 19.5 0.5 17.4853 0.5 15C0.5 12.5147 2.51472 10.5 5 10.5C7.48528 10.5 9.5 12.5147 9.5 15C9.5 17.4853 7.48528 19.5 5 19.5ZM15 9.5C12.5147 9.5 10.5 7.48528 10.5 5C10.5 2.51472 12.5147 0.5 15 0.5C17.4853 0.5 19.5 2.51472 19.5 5C19.5 7.48528 17.4853 9.5 15 9.5ZM15 19.5C12.5147 19.5 10.5 17.4853 10.5 15C10.5 12.5147 12.5147 10.5 15 10.5C17.4853 10.5 19.5 12.5147 19.5 15C19.5 17.4853 17.4853 19.5 15 19.5ZM5 7.5C6.38071 7.5 7.5 6.38071 7.5 5C7.5 3.61929 6.38071 2.5 5 2.5C3.61929 2.5 2.5 3.61929 2.5 5C2.5 6.38071 3.61929 7.5 5 7.5ZM5 17.5C6.38071 17.5 7.5 16.3807 7.5 15C7.5 13.6193 6.38071 12.5 5 12.5C3.61929 12.5 2.5 13.6193 2.5 15C2.5 16.3807 3.61929 17.5 5 17.5ZM15 7.5C16.3807 7.5 17.5 6.38071 17.5 5C17.5 3.61929 16.3807 2.5 15 2.5C13.6193 2.5 12.5 3.61929 12.5 5C12.5 6.38071 13.6193 7.5 15 7.5ZM15 17.5C16.3807 17.5 17.5 16.3807 17.5 15C17.5 13.6193 16.3807 12.5 15 12.5C13.6193 12.5 12.5 13.6193 12.5 15C12.5 16.3807 13.6193 17.5 15 17.5Z" fill="#fff"/>
              </svg>
            </Link>
          </li>
          <li className="header__nav-item">
            <svg onClick={onSearchOpen} width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="#fff"/>
            </svg>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="list-reset header__nav-list">
        <li className={mainClass} onClick={() => handleStateChange("main")}>
          <Link to={"/"}>Главная</Link>
        </li>
        <li className={genresClass} onClick={() => handleStateChange("genres")}>
          <Link to={"/genres"}>Жанры</Link>
        </li>
      </ul>
      <HeaderSearch />
    </nav>
  );
}
