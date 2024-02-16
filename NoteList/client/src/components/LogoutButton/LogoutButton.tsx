import { MouseEventHandler, FC } from "react";

import { Button } from "../Button";
import "./LogoutButton.css";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/User";
import { queryClient } from "../../api/QueryClient";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User";

export const LogoutButton: FC = () => {
  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    }
  }, queryClient);

  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    logoutMutation.mutate();
    meQuery.refetch();
  }

  return (
    <div className="logout-button">
      <Button kind="secondary" onClick={handleClick} isLoading={logoutMutation.isPending}>Выйти</Button>
    </div>
  );
};
