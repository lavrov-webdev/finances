import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

import { FieldWithRightButton, TextInput } from "@/atoms";
import { TUpdateCategoriesFormFields } from "@/modules/categories/index.ts";

import {
  CATEGORIES_QUERY_KEY,
  deleteCategory,
} from "../../categories.api.ts";

type TProps = {
  id: number;
  name: `editableCategories.${number}`;
  onDeleteFromRhf: () => void;
  idx: number;
};

export const EditableCategory: FC<TProps> = ({
  name,
  id,
  onDeleteFromRhf,
  idx,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const form = useFormContext<TUpdateCategoriesFormFields>();
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
      onDeleteFromRhf();
    },
  });
  const onDelete = () => {
    deleteCategoryMutation.mutate(id);
  };
  const enterEditMode = () => setIsEditMode(true);
  const exitEditMode = () => setIsEditMode(false);

  const field = isEditMode ? (
    <TextInput
      onBlurCapture={exitEditMode}
      variant="standard"
      fullWidth
      autoFocus
      name={`${name}.name`}
      error={form.formState.errors.editableCategories?.[idx]?.name?.message}
    />
  ) : (
    <Box width="100%" style={{ cursor: "pointer" }} onClick={enterEditMode}>
      <Typography>{form.getValues(`${name}.name`)}</Typography>
    </Box>
  );

  const deleteButton = (
    <IconButton
      disabled={deleteCategoryMutation.isLoading}
      onClick={onDelete}
      aria-label={`delete ${name}`}
    >
      <DeleteIcon />
    </IconButton>
  );

  return <FieldWithRightButton field={field} button={deleteButton} />;
};
