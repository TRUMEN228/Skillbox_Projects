import { FC, ReactNode, ButtonHTMLAttributes } from "react";
import "./style.css";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  type?: "submit" | "reset" | "button";
  kind?: "primary" | "secondary";
  disabled?: boolean;
  display?: "block" | "none";
  name?: string;
  className?: string;
}

export const Button: FC<IButton> = ({
  children,
  type = "button",
  kind = "primary",
  disabled = false,
  display = "block",
  name,
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      name={name}
      className={className ? `button ${kind} ${className}` : `button ${kind}`}
      style={{display: display}}
      {...props}
    >
      {children}
    </button>
  );
}