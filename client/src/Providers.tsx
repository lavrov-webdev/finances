import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: import.meta.env.DEV ? 0 : 1000 * 60 * 5,
    },
  },
});

const themeOptions = createTheme({
  palette: {
    primary: {
      main: "#1b814b",
    },
    secondary: {
      main: "#d67f2d",
    },
    warning: {
      main: "#ff9800",
    },
  },
});

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeOptions}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          {children}
          <ToastContainer position="top-center" />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
