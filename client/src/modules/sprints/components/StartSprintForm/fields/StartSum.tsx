import { Box } from "@mui/material";

import { AmountInput, FormSubtitle } from "@/atoms";

export const StartSum = () => {
  return (
    <Box mt={4}>
      <FormSubtitle text="Начальная сумма" />
      <AmountInput name="startSum" fullWidth />
    </Box>
  );
};
