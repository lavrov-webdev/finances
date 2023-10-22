import { separateThousand } from "@/helpres";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  error?: string
} & Omit<TextFieldProps, 'error'>;

export const AmountInput: FC<Props> = ({ name, error, ...rest }) => {
  const form = useFormContext();
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const fieldError = error || fieldState.error?.message
        return (
          <FormControl fullWidth={rest.fullWidth}>
            <TextField
              {...rest}
              {...field}
              value={separateThousand(field.value, false)}
              onChange={(e) => {
                field.onChange(+e.target.value.replaceAll(/[^0-9-]/gi, ""));
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">₽</InputAdornment>
                )
              }}
            />
            {fieldError && (
              <FormHelperText error>
                {fieldError?.toString()}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

