import { DatePicker } from "@/atoms";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const CreateTransactionDate = () => {
  return (
    <Grid2 xs={1}>
      <DatePicker name="date" />
    </Grid2>
  );
};
