import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAuthStore } from "../auth";

export const Header = () => {
  const authStore = useAuthStore();
  //TODO добавить мобильную версию
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap component="div">
          Мои финансы
        </Typography>
        {authStore.isAuthorized && (
          <Button color="inherit" onClick={authStore.logout}>
            Выйти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
