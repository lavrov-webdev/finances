import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

import { useRootStore } from "@/root.sotre";

import { useAuthStore } from "../auth";
export const Header = () => {
  const authStore = useAuthStore();
  const rootStore = useRootStore();
  const toggleTheme = () => {
    rootStore.setTheme(rootStore.theme === "dark" ? "light" : "dark");
  };
  //TODO добавить мобильную версию
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <div style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Typography
            sx={{ marginRight: 4 }}
            variant="h6"
            noWrap
            component="span"
          >
            Мои финансы
          </Typography>
          <IconButton onClick={toggleTheme}>
            {rootStore.theme === "dark" ? (
              <WbSunnyIcon />
            ) : (
              <NightsStayIcon color="warning" />
            )}
          </IconButton>
        </div>
        {authStore.isAuthorized && (
          <Button color="inherit" onClick={authStore.logout}>
            Выйти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
