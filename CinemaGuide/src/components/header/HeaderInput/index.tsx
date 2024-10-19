import { FC,  InputHTMLAttributes } from "react";
import "./style.css";

interface IHeaderInput extends InputHTMLAttributes<HTMLInputElement> {
  kind: "dark" | "light";
  display: "block" | "none";
  onClearClick: () => void;
}

export const HeaderInput: FC<IHeaderInput> = ({
  kind,
  display,
  onClearClick,
  ...props
}) => {
  return (
    <div className="input__container header__input-container">
      <input
        type="text"
        className={`input header__input ${kind}`}
        {...props}
      />
      <svg className="header__input-search" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="rgba(255, 255, 255, 0.5)"/>
      </svg>
      <svg onClick={onClearClick} className="header__input-clear" style={{ display: display }} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.9997 5.5865L11.9495 0.636719L13.3637 2.05093L8.4139 7.0007L13.3637 11.9504L11.9495 13.3646L6.9997 8.4149L2.04996 13.3646L0.635742 11.9504L5.5855 7.0007L0.635742 2.05093L2.04996 0.636719L6.9997 5.5865Z" fill="white" fill-opacity="0.5"/>
      </svg>
    </div>
  );
}