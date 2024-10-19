import { FC } from "react";
import { User } from "../../../../api/types";
import "./style.css";
import { Button } from "../../../general/Button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../../../api/auth";
import { queryClient } from "../../../../api/queryClient";
import useMaxWidthQuery from "../../../../hooks/useMediaQuery";
import { Container } from "../../../general/Container";

interface IAccountSettingsPage {
  user: User;
  refetchUser: () => Promise<void>;
}

function getFirstLetters(name: string, surname: string): string {
  return name[0] + surname[0];
}

export const AccountSettingsPage: FC<IAccountSettingsPage> = ({
  user,
  refetchUser
}) => {
  const isMobile = useMaxWidthQuery(375);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] })
    }
  }, queryClient);

  const handleClick = () => {
    logoutMutation.mutate();

    if (logoutMutation.isSuccess) {
      refetchUser();
      window.location.pathname = "/";
    }
  }

  if (isMobile) {
    return (
      <Container>
        <div className="account-settings__container">
          <div className="account-settings__name-container">
            <div className="account-settings__icon">
              {getFirstLetters(user.name, user.surname)}
            </div>
            <div className="account-settings__content">
              <span className="account-settings__content-label">Имя Фамилия</span>
              <span className="account-settings__content-data">{user.name} {user.surname}</span>
            </div>
          </div>
          <div className="account-settings__email-container">
            <div className="account-settings__icon">
              <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z" fill="#fff"/>
              </svg>
            </div>
            <div className="account-settings__content">
              <span className="account-settings__content-label">Электронная почта</span>
              <span className="account-settings__content-data">{user.email}</span>
            </div>
          </div>
          <Button kind="primary" className="account-settings__btn" onClick={handleClick}>
            Выйти из аккаунта
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="account-settings__container">
      <div className="account-settings__name-container">
        <div className="account-settings__icon">
          {getFirstLetters(user.name, user.surname)}
        </div>
        <div className="account-settings__content">
          <span className="account-settings__content-label">Имя Фамилия</span>
          <span className="account-settings__content-data">{user.name} {user.surname}</span>
        </div>
      </div>
      <div className="account-settings__email-container">
        <div className="account-settings__icon">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z" fill="#fff"/>
          </svg>
        </div>
        <div className="account-settings__content">
          <span className="account-settings__content-label">Электронная почта</span>
          <span className="account-settings__content-data">{user.email}</span>
        </div>
      </div>
      <Button kind="primary" className="account-settings__btn" onClick={handleClick}>
        Выйти из аккаунта
      </Button>
    </div>
  );
}