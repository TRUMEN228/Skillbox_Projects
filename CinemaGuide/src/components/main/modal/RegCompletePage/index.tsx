import { FC } from "react";
import { ModalLogo } from "../ModalLogo";
import "./style.css";
import { Button } from "../../../general/Button";

interface IRegCompletePage {
  onSwitchType: (type: "reg" | "auth" | "success") => void;
}

export const RegCompletePage: FC<IRegCompletePage> = ({
  onSwitchType
}) => {
  const onClick = () => {
    onSwitchType("auth");
  }

  return (
    <div className="modal-complete__container">
      <ModalLogo />
      <h1 className="modal-complete__title">Регистрация завершена</h1>
      <p className="modal-complete__descr">Используйте вашу электронную почту для входа</p>
      <Button onClick={onClick}>Войти</Button>
    </div>
  );
}