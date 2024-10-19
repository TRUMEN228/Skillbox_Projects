import { FC, useState } from "react";
import { HeaderLogo } from "../HeaderLogo";
import { HeaderNavBar } from "../HeaderNavBar";
import { HeaderAccountButton } from "../HeaderAccountButton";
import { Container } from "../../general/Container";
import { User } from "../../../api/types";
import "./style.css";
import useMaxWidthQuery from "../../../hooks/useMediaQuery";

interface IHeader {
  user?: User;
  onModalOpen: () => void;
  onSearchOpen: () => void;
}

export const Header: FC<IHeader> = ({
  user,
  onModalOpen,
  onSearchOpen
}) => {
  const [state, setState] = useState<"main" | "genres" | "account">("main");
  const isMobile = useMaxWidthQuery(375);

  const handleStateChange = (state: "main" | "genres" | "account") => {
    setState(state);
  }

  if (isMobile) {
    return (
      <Container>
        <div className="header__container">
          <HeaderLogo />
          <div className="header__nav-container">
            <HeaderNavBar state={state} onStateChange={handleStateChange} onSearchOpen={onSearchOpen} />
            <HeaderAccountButton state={state} userData={user} onClick={onModalOpen} onStateChange={handleStateChange} />
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="header__container">
        <HeaderLogo />
        <HeaderNavBar state={state} onStateChange={handleStateChange} />
        <HeaderAccountButton state={state} userData={user} onClick={onModalOpen} onStateChange={handleStateChange} />
      </div>
    </Container>
  );
}