import { FormSubtitle, TextInput } from "@/atoms";
import { Box, InputAdornment } from "@mui/material";

export const StartSum = () => {
  return (
    <Box mt={4}>
      <FormSubtitle text="Начальная сумма" />
      <TextInput
        fullWidth
        name="startSum"
        label="Сумма"
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="start">₽</InputAdornment>,
        }}
      />
    </Box>
  );
};
