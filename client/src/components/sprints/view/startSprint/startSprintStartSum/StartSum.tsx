import { AmountInput, FormSubtitle } from "@/atoms";
import { Box } from "@mui/material";

export const StartSum = () => {
  return (
    <Box mt={4}>
      <FormSubtitle text="Начальная сумма" />
      <AmountInput name="startSum" fullWidth />
    </Box>
  );
};
