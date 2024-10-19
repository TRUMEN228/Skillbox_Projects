import { FC } from "react";
import "./style.css";
import useMaxWidthQuery from "../../../hooks/useMediaQuery";

export const CopyrightView: FC = () => {
  const isMobile = useMaxWidthQuery(375);

  if (isMobile) {
    return (
      <div className="footer-copyright__container">
        <span className="footer-copyright__franchise">LLC «Мультимедиа Визион»</span>
        <div className="footer-copyright__copyright">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2877 7.42773C13.413 5.97351 11.8195 5 10 5C7.23999 5 5 7.23999 5 10C5 12.76 7.23999 15 10 15C11.8195 15 13.413 14.0265 14.2877 12.5723L12.5729 11.5442C12.0483 12.4166 11.0927 13 10 13C8.3425 13 7 11.6575 7 10C7 8.3425 8.3425 7 10 7C11.093 7 12.0491 7.58386 12.5735 8.4568L14.2877 7.42773ZM20 10C20 4.47998 15.52 0 10 0C4.47998 0 0 4.47998 0 10C0 15.52 4.47998 20 10 20C15.52 20 20 15.52 20 10ZM2 10C2 5.57996 5.57996 2 10 2C14.42 2 18 5.57996 18 10C18 14.42 14.42 18 10 18C5.57996 18 2 14.42 2 10Z" fill="white" fillOpacity="0.7"/>
          </svg>
          <span className="footer-copyright__rights">Все права защищены</span>
        </div>
      </div>
    );
  }

  return (
    <div className="footer-copyright__container">
      <span className="footer-copyright__franchise">LLC «Мультимедиа Визион»</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.2877 7.42773C13.413 5.97351 11.8195 5 10 5C7.23999 5 5 7.23999 5 10C5 12.76 7.23999 15 10 15C11.8195 15 13.413 14.0265 14.2877 12.5723L12.5729 11.5442C12.0483 12.4166 11.0927 13 10 13C8.3425 13 7 11.6575 7 10C7 8.3425 8.3425 7 10 7C11.093 7 12.0491 7.58386 12.5735 8.4568L14.2877 7.42773ZM20 10C20 4.47998 15.52 0 10 0C4.47998 0 0 4.47998 0 10C0 15.52 4.47998 20 10 20C15.52 20 20 15.52 20 10ZM2 10C2 5.57996 5.57996 2 10 2C14.42 2 18 5.57996 18 10C18 14.42 14.42 18 10 18C5.57996 18 2 14.42 2 10Z" fill="white" fillOpacity="0.7"/>
      </svg>
      <span className="footer-copyright__rights">Все права защищены</span>
    </div>
  );
}