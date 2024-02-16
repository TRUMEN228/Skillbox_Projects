import { FC, FormEventHandler, useState } from "react";

import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/User";
import { queryClient } from "../../api/QueryClient";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    }
  }, queryClient);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    loginMutation.mutate();
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Email">
        <input
          type="text"
          name="email"
          onChange={event => setEmail(event.currentTarget.value)}
          value={email}
        />
      </FormField>
      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={event => setPassword(event.currentTarget.value)}
          value={password}
        />
      </FormField>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}

      <Button type="submit" isLoading={loginMutation.isPending}>Войти</Button>
    </form>
  );
};
