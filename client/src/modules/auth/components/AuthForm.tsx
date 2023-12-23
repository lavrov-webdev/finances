import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack } from "@mui/material";
import { AxiosError, HttpStatusCode } from "axios";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormDevTool, PasswordInput, TextInput } from "@/atoms";

import { AuthDto, TAuthDto, useAuthStore } from "..";

type TProps = {
  action: "signup" | "signin";
  buttonText: string;
};
export const AuthForm: FC<TProps> = ({ action, buttonText }) => {
  const store = useAuthStore();
  const form = useForm<TAuthDto>({ resolver: zodResolver(AuthDto) });
  const renderErrorToast = (message: string) =>
    toast(message, { type: "error" });
  const onSubmit = async (data: TAuthDto) => {
    try {
      if (action === "signin") await store.signIn(data);
      if (action === "signup") await store.signUp(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case HttpStatusCode.Conflict:
            renderErrorToast("Пользователь с таким email уже существует");
            break;
          case HttpStatusCode.NotFound:
            renderErrorToast(
              "Пользователя с таким email и паролем не существует"
            );
            break;
          default:
            renderErrorToast(error.message);
        }
      }
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Stack dir="column" gap={3}>
          <TextInput name="email" label="Email" isFloatinLabel />
          <PasswordInput name="password" label="Password" />
          <LoadingButton
            loading={form.formState.isSubmitting}
            variant="contained"
            type="submit"
            size="large"
          >
            {buttonText}
          </LoadingButton>
        </Stack>
        <FormDevTool />
      </FormProvider>
    </form>
  );
};
