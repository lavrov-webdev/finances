import { AuthForm } from "./AuthForm.tsx";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import { useAuthStore } from "../auth.store.ts";
import { AppLink } from "@/atoms";

export const AuthPage = () => {
  const authStore = useAuthStore();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const action = (
    params.action === "signin" || params.action === "singUp"
      ? params.action
      : "signup"
  ) as "signin" | "signup";

  const buttonText = action === "signup" ? "Зарегестрироваться" : "Войти";

  const redirect = searchParams.get("redirect") || "/";

  if (authStore.isAuthorized) return <Navigate to={redirect} />;

  return (
    <Stack alignItems="center">
      <Box maxWidth="600px" width="100%">
        <AuthForm action={action} buttonText={buttonText} />
        <Paper elevation={2}>
          <Box px={5} py={3} mt={4}>
            <Typography textAlign="center">
              {action === "signup" ? (
                <>
                  Уже есть аккаунт? Перейдите на страницу&nbsp;
                  <AppLink to={`/auth/signin?redirect=${redirect}`}>
                    Входа
                  </AppLink>
                </>
              ) : (
                <>
                  Нет аккаунта? Перейдите на странцу&nbsp;
                  <AppLink to={`/auth/signup?redirect=${redirect}`}>
                    Регистрации
                  </AppLink>
                </>
              )}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
};
