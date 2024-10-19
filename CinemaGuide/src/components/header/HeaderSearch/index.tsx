import { FC, useState, ChangeEventHandler } from "react";
import "./style.css";
import { SearchView } from "../SearchView";
import { Movie } from "../../../api/types";
import { getFilteredMovies } from "../../../api/movies";0
import { HeaderInput } from "../HeaderInput";

interface IHeaderSearch {
  onClose?: () => void;
}

export const HeaderSearch: FC<IHeaderSearch> = ({
  onClose
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchDisplay, setSearchDisplay] = useState<"flex" | "none">("none");
  const [clearDisplay, setClearDisplay] = useState<"block" | "none">("none");
  const [filmList, setFilmList] = useState<Movie[]>([]);

  const getFilteredFilms = async (title: string): Promise<void> => {
    const data = await getFilteredMovies({title: title});
    setFilmList(data);
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.currentTarget.value) {
      setSearchDisplay("none");
      setClearDisplay("none");
      setInputValue("");
      return;
    }

    setInputValue(event.currentTarget.value);
    getFilteredFilms(event.currentTarget.value);
    setSearchDisplay("flex");
    setClearDisplay("block");
  }

  const handleFilmClick = () => {
    setInputValue("");
    setSearchDisplay("none");
    setClearDisplay("none");

    onClose && onClose();
  }

  const handleClearClick = () => {
    setInputValue("");
    setSearchDisplay("none");
    setClearDisplay("none");
  }

  return (
    <div className="header-input__container">
      <HeaderInput
        kind="dark"
        display={clearDisplay}
        onClearClick={handleClearClick}
        placeholder="Поиск"
        onChange={handleChange}
        value={inputValue}
      />
      <SearchView
        display={searchDisplay}
        films={filmList}
        onClick={handleFilmClick}
      />
    </div>
  );
}