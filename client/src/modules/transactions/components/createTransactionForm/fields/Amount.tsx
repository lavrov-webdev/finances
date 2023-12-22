import { AmountInput } from "@/atoms";
import Grid2 from "@mui/material/Unstable_Grid2";

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
