import { FC } from "react";
import "./style.css";
import { ModalLogo } from "../ModalLogo";
import { Input } from "../../../general/Input";
import { Button } from "../../../general/Button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../../api/auth";
import { queryClient } from "../../../../api/queryClient";

interface IModalRegPage {
  onSwitchType: (type: "reg" | "auth" | "success") => void;
}

const RegisterSchema = z.object({
  email: z.string().min(1, { message: "minEmail" }).email({ message: "email" }),
  name: z.string().min(1, { message: "name" }),
  surname: z.string().min(1, { message: "surname" }),
  password: z.string().min(6, { message: "password" }),
  confirmPassword: z.string().min(6, { message: "confirmPasswword" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "not_confirmed",
  path: ['confirmPassword']
});

type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const ModalRegPage: FC<IModalRegPage> = ({
  onSwitchType
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema)
  });

  const registerMutation = useMutation({
    mutationFn: (data: {
      email: string,
      password: string,
      name: string,
      surname: string
    }) => registerUser(data)
  }, queryClient);

  const onAuthClick = () => {
    onSwitchType("auth");
  }

  const onRegisterSuccess = () => {
    onSwitchType("success");
  }

  return (
    <div className="modal-reg__container">
      <ModalLogo />
      <h1 className="modal-reg__title">Регистрация</h1>
      <form
        className="modal-reg__form"
        onSubmit={handleSubmit(({ email, password, name, surname }) => {
          registerMutation.mutate({email, password, name, surname});

          if (registerMutation.isSuccess) {
            onRegisterSuccess();
          }
        })}
      >
        <Input
          type="text"
          kind="light"
          placeholder="Электронная почта"
          {...register("email")}
          error={errors.email?.message}
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z" fill="black"/>
          </svg>
        </Input>
        <Input
          kind="light"
          placeholder="Имя"
          {...register("name")}
          error={errors.name?.message}
        >
          <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z" fill="#000"/>
          </svg>
        </Input>
        <Input
          kind="light"
          placeholder="Фамилия"
          {...register("surname")}
          error={errors.surname?.message}
        >
          <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z" fill="#000"/>
          </svg>
        </Input>
        <Input
          type="password"
          kind="light"
          placeholder="Пароль"
          {...register("password")}
          error={errors.password?.message}
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.917 7C11.441 9.8377 8.973 12 6 12C2.68629 12 0 9.3137 0 6C0 2.68629 2.68629 0 6 0C8.973 0 11.441 2.16229 11.917 5H22V7H20V11H18V7H16V11H14V7H11.917ZM6 10C8.20914 10 10 8.2091 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.2091 3.79086 10 6 10Z" fill="black"/>
          </svg>
        </Input>
        <Input
          type="password"
          kind="light"
          placeholder="Повторите пароль"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.917 7C11.441 9.8377 8.973 12 6 12C2.68629 12 0 9.3137 0 6C0 2.68629 2.68629 0 6 0C8.973 0 11.441 2.16229 11.917 5H22V7H20V11H18V7H16V11H14V7H11.917ZM6 10C8.20914 10 10 8.2091 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.2091 3.79086 10 6 10Z" fill="black"/>
          </svg>
        </Input>
        <Button type="submit" className="modal-reg__btn">Создать аккаунт</Button>
      </form>
      <button className="btn-reset modal-reg__auth-btn" onClick={onAuthClick}>У меня есть пароль</button>
    </div>
  );
}