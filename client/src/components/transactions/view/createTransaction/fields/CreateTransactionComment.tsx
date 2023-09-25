import { TextInput } from "@/atoms";
import Grid2 from "@mui/material/Unstable_Grid2";

export const CreateTransactionComment = () => {
  return (
    <Grid2 xs={1}>
      <TextInput fullWidth label="Комментарий" name="comment" />
    </Grid2>
  );
};
