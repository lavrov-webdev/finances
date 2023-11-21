import { AppLink } from "@/atoms";
import { Alert, Box } from "@mui/material";

export const StartSprintEmptyCategoriesAlert = () => {
  return (
    <Box maxWidth={600}>
      <Alert severity="warning">
        Вы пока не создали ни одной категории. <br />
        Без них не получится начать новый спринт. <br />
        Создайте несколько на странице{" "}
        <AppLink to="/categories">обновления категорий</AppLink>
      </Alert>
    </Box>
  );
};
