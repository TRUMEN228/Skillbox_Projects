import { FC } from "react";
import { AccountFavoritesPage } from "../AccountFavoritesPage";
import { User } from "../../../../api/types";
import { AccountSettingsPage } from "../AccountSettingsPage";

interface IAccountPageRouter {
  page: "favorites" | "settings";
  user: User;
  refetchUser: () => Promise<void>;
}

export const AccountPageRouter: FC<IAccountPageRouter> = ({
  page,
  user,
  refetchUser
}) => {
  switch (page) {
    case "favorites":
      return <AccountFavoritesPage user={user} refetchUser={refetchUser} />;
    case "settings":
      return <AccountSettingsPage user={user} refetchUser={refetchUser} />;
  }
}