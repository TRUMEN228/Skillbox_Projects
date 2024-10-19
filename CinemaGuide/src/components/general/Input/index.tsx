import React, { ReactElement, JSXElementConstructor, cloneElement, InputHTMLAttributes, forwardRef } from "react";
import "./style.css";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  kind: "dark" | "light";
  error?: string;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

export const Input = forwardRef<HTMLInputElement, IInput>(({
  containerClassName,
  kind,
  error = "",
  children,
  ...props
}, ref) => {
  const icon = React.Children.map(children, (child) => {
    return cloneElement(child, {
      className: "input__icon"
    });
  });

  const checkError = (): boolean => {
    if (error) console.log(error);
    return error ? true : false;
  }

  const inputClassName = checkError() ? `input ${kind} error` : `input ${kind}`;

  return (
    <div className={containerClassName ? `input__container ${containerClassName}` : "input__container"}>
      <input
        className={`${props.className} ${inputClassName}`}
        ref={ref}
        {...props}
      />
      {icon}
    </div>
  );
})