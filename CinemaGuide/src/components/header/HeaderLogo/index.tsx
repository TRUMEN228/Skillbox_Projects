import { FC } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import useMaxWidthQuery from "../../../hooks/useMediaQuery";
import logo from "../../../assets/logo.png";
import logoSmall from "../../../assets/logo_small.png";

export const HeaderLogo: FC = () => {
  const isMobile = useMaxWidthQuery(375);

  return (
    <Link to={"/"} className="header__logo-link">
      <img className="header__logo" src={isMobile ? logoSmall : logo} alt="Логотип CinemaGuide" />
    </Link>
  );
}