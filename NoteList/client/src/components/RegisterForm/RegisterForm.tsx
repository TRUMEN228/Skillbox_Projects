import { FC } from "react";
import { z } from "zod";

import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegisterForm.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/QueryClient";

const CreateUserScheme = z.object({
  username: z.string().min(5, "Имя пользователя должно содержать не менее 5 символов"),
  email: z.string().email("E-mail должен содержать символ '@'"),
  password: z.string().min(8, "Пароль должен содержать не менее 8 символов")
});

type CreateUserForm = z.infer<typeof CreateUserScheme>;

export const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserForm>({
    resolver: zodResolver(CreateUserScheme)
  });

  const createUserMutation = useMutation({
    mutationFn: (data: {username: string, email: string, password: string}) => registerUser(data.username, data.email, data.password),
  }, queryClient);

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit(({ username, email, password }) => {
        createUserMutation.mutate({ username, email, password })
      })}
    >
      <FormField label="Имя" errorMessage={errors.username?.message}>
        <input
          type="text"
          {...register("username")}
        />
      </FormField>
      <FormField label="Email" errorMessage={errors.email?.message}>
        <input
          type="email"
          {...register("email")}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={errors.password?.message}>
        <input
          type="password"
          {...register("password")}
        />
      </FormField>
      <Button>Зарегистрироваться</Button>
    </form>
  );
};
