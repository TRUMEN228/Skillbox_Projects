import { FC } from "react";
import { Container } from "../../general/Container";
import { CopyrightView } from "../CopyrightView";
import "./style.css";
import { SocialsList } from "../SocialsList";

export const Footer: FC = () => {
  return (
    <Container>
      <div className="footer__container">
        <CopyrightView />
        <SocialsList />
      </div>
    </Container>
  );
}