import { FC } from "react";
import { ModalLogo } from "../ModalLogo";
import "./style.css";
import { Input } from "../../../general/Input";
import { Button } from "../../../general/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../../api/auth";
import { z } from "zod";
import { queryClient } from "../../../../api/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IModalAuthPage {
  onSwitchType: (type: "reg" | "auth" | "success") => void;
  onClose: () => void;
  refetchUser: () => Promise<void>;
}

const LoginSchema = z.object({
  email: z.string().min(1, { message: "error" }).email({ message: "error" }),
  password: z.string().min(6, { message: "error" })
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const ModalAuthPage: FC<IModalAuthPage> = ({
  onClose,
  onSwitchType,
  refetchUser
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (data: {email: string, password: string}) => login(data)
  }, queryClient);

  const onRegClick = () => {
    onSwitchType("reg");
  }

  return (
    <div className="modal-auth__container">
      <ModalLogo />
      <form className="modal-auth__form" onSubmit={handleSubmit(({ email, password }) => {
        loginMutation.mutate({ email, password });

        if (loginMutation.isSuccess) {
          refetchUser();
          onClose();
        }
      })}>
        <Input
          type="text"
          kind="light"
          placeholder="Электронная почта"
          containerClassName="modal-auth__input email"
          {...register("email")}
          error={errors.email?.message}
        >
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z" fill="black"/>
          </svg>
        </Input>
        <Input
          type="password"
          kind="light"
          placeholder="Пароль"
          containerClassName="modal-auth__input password"
          {...register("password")}
          error={errors.password?.message}
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.917 7C11.441 9.8377 8.973 12 6 12C2.68629 12 0 9.3137 0 6C0 2.68629 2.68629 0 6 0C8.973 0 11.441 2.16229 11.917 5H22V7H20V11H18V7H16V11H14V7H11.917ZM6 10C8.20914 10 10 8.2091 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.2091 3.79086 10 6 10Z" fill="black"/>
          </svg>
        </Input>
        <Button
          type="submit"
          className="modal-auth__btn"
        >
          Войти
        </Button>
      </form>
      <button className="btn-reset modal-auth__reg-btn" onClick={onRegClick}>Регистрация</button>
    </div>
  );
}