import { CheckBox as MUICheckbox } from "@mui/icons-material";
import { FormControl } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
};

export const Checkbox: FC<Props> = ({ name }) => {
  const form = useFormContext();
  return (
    <FormControl>
      <MUICheckbox {...form.register(name)} />
    </FormControl>
  );
};
