import { FC } from "react";
import "./Loader.css";

interface LoaderProps {
  loaderClassName?: string;
  loaderItemClassName?: string
}

export const Loader: FC<LoaderProps> = ({
  loaderClassName,
  loaderItemClassName
}) => (
  <div className={loaderClassName ? "loader " + loaderClassName : "loader"}>
    <div className={loaderItemClassName ? "loader-item " + loaderItemClassName : "loader-item"}></div>
    <div className={loaderItemClassName ? "loader-item " + loaderItemClassName : "loader-item"}></div>
    <div className={loaderItemClassName ? "loader-item " + loaderItemClassName : "loader-item"}></div>
  </div>
);
