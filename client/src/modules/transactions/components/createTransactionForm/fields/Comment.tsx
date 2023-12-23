import Grid2 from "@mui/material/Unstable_Grid2";

import { TextInput } from "@/atoms";

export const Comment = () => {
  return (
    <Grid2 xs={1}>
      <TextInput isFloatinLabel fullWidth label="Комментарий" name="comment" />
    </Grid2>
  );
};
