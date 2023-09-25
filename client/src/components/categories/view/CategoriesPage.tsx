import { UpdateCategoriesForm } from "./updateCategoriesForm/UpdateCategoriesForm.tsx";
import { Box } from "@mui/material";

export const CategoriesPage = () => {
  return (
    <Box maxWidth="600px" width="100%">
      <UpdateCategoriesForm />
    </Box>
  );
};
