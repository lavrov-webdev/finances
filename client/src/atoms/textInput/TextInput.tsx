import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FC } from "react";

type TProps = Omit<TextFieldProps, "error"> & {
  name: string;
  error?: string;
  isFloatinLabel?: boolean;
};
export const TextInput: FC<TProps> = ({
  name,
  error,
  isFloatinLabel,
  label,
  ...rest
}) => {
  const form = useFormContext();
  const fieldError = error || form.formState.errors[name]?.message;
  return (
    <FormControl fullWidth={rest.fullWidth}>
      {!isFloatinLabel && label && <FormLabel>{label}</FormLabel>}
      <TextField
        {...rest}
        error={!!error}
        {...form.register(name, { valueAsNumber: rest.type === "number" })}
        label={isFloatinLabel && label}
      />
      {fieldError && (
        <FormHelperText error>{fieldError?.toString()}</FormHelperText>
      )}
    </FormControl>
  );
};
