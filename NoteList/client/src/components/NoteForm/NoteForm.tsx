import { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../api/Note";
import { queryClient } from "../../api/QueryClient";

const CreateNoteScheme = z.object({
  title: z.string().min(5, "Заголовок должен содержать не менее 5 символов"),
  text: z.string().min(10, "Текст заметки должен содержать не менее 10 символов").max(300, "Текст заметки должен содержать не более 300 символов")
});

type CreateNoteForm = z.infer<typeof CreateNoteScheme>;

export const NoteForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteScheme)
  });

  const createNoteMutation = useMutation({
    mutationFn: (data: {title: string, text: string}) => createNote(data.title, data.text),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
  }, queryClient);

  return (
    <form
      className="note-form"
      onSubmit={handleSubmit(({ title, text }) => {
        createNoteMutation.mutate({ title, text });
        reset();
      })}
    >
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input
          type="text"
          {...register("title")}
        />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea
          {...register("text")}
        />
      </FormField>
      <Button isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};
