import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { DatePicker } from "@/atoms";

export const Date = () => {
  return (
    <Grid2 xs={1}>
      <DatePicker name="date" />
    </Grid2>
  );
};
