import { useFieldArray, useFormContext } from "react-hook-form";
import { EditableCategory } from "./EditableCategory.tsx";
import { FC } from "react";
import { List, ListItem } from "@mui/material";
import { FormSubtitle } from "@/atoms";
import { TUpdateCategoriesFormFields } from "@/modules/categories/index.ts";

type TProps = {
  isLoading: boolean;
};

export const EditCategories: FC<TProps> = ({ isLoading }) => {
  const form = useFormContext<TUpdateCategoriesFormFields>();
  const editableCategories = useFieldArray({
    control: form.control,
    name: "editableCategories",
    keyName: "rhfId",
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <FormSubtitle text="Существующие категории" />
      <List>
        {editableCategories.fields.map((editableCategory, idx) => (
          <ListItem key={editableCategory.id}>
            <EditableCategory
              id={editableCategory.id}
              idx={idx}
              name={`editableCategories.${idx}`}
              onDeleteFromRhf={() => editableCategories.remove(idx)}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
