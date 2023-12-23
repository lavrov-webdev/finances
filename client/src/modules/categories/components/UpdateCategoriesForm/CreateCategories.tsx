import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, List, ListItem } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { FieldWithRightButton, FormSubtitle, TextInput } from "@/atoms";
import { TUpdateCategoriesFormFields } from "@/modules/categories";

export const CreateCategories = () => {
  const form = useFormContext<TUpdateCategoriesFormFields>();
  const newCategories = useFieldArray({
    control: form.control,
    name: "newCategories",
  });
  const addNewCategory = () => {
    newCategories.append({ name: "" }, { shouldFocus: true });
  };
  return (
    <Box>
      <FormSubtitle text="Новые категории" />
      <List>
        {newCategories.fields.map((category, idx) => (
          <ListItem key={category.id}>
            <FieldWithRightButton
              field={
                <TextInput
                  variant="standard"
                  fullWidth
                  name={`newCategories.${idx}.name`}
                  error={
                    form.formState.errors.newCategories?.[idx]?.name?.message
                  }
                />
              }
              button={
                <IconButton onClick={() => newCategories.remove(idx)}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ListItem>
        ))}
        <Box mt={3}>
          <Button onClick={addNewCategory}>Добавить категорию</Button>
        </Box>
      </List>
    </Box>
  );
};
