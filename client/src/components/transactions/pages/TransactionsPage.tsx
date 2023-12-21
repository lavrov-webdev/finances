import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export const TransactionsPage = () => {
  return (
    <Box maxWidth="90%">
      <Outlet />
    </Box>
  );
};
