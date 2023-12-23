import Grid2 from "@mui/material/Unstable_Grid2";

import { AmountInput } from "@/atoms";

export const Amount = () => {
  return (
    <Grid2 xs={1}>
      <AmountInput
        fullWidth
        name="amount"
        label="Сумма"
      />
    </Grid2>
  );
};
