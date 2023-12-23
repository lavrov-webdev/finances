import { DatePickerProps } from "@mui/lab";
import { FormControl, FormHelperText, FormLabel } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
  defaultDate?: Dayjs;
  isFloating?: boolean;
} & DatePickerProps<Date>;

export const DatePicker: FC<TProps> = ({
  label,
  name,
  defaultDate,
  isFloating,
  ...rest
}) => {
  const form = useFormContext();
  const error = form.formState.errors[name]?.message;
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange } }) => (
          <>
            {!isFloating && <FormLabel>{label}</FormLabel>}
            <MuiDatePicker
              {...rest}
              label={isFloating && label}
              timezone="UTC"
              slotProps={{ textField: { fullWidth: true } }}
              defaultValue={defaultDate}
              onChange={(date: Dayjs | null) => {
                if (!date) {
                  onChange("");
                } else {
                  date = date.startOf("day");
                  onChange(date.toDate());
                }
              }}
            />
          </>
        )}
      />
      {error && <FormHelperText error>{error.toString()}</FormHelperText>}
    </FormControl>
  );
};
