import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import { AsideMenu } from "./AsideMenu.tsx";
import { Header } from "./Header.tsx";

export const BaseLayout = () => {
  return (
    <Box minHeight="100vh">
      <AsideMenu />
      <Header />
      <Box
        component="main"
        width="calc(100vw - 300px)"
        ml="300px"
        py={5}
        pl={10}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
