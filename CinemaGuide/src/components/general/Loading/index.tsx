import { FC } from "react";
import "./style.css";
import { Container } from "../Container";

export const Loading: FC = () => {
  return (
    <Container>
      <div className="loading__container">
        <span>Загрузка...</span>
      </div>
    </Container>
  );
}