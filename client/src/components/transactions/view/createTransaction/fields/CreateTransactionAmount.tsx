import { TextInput } from "@/atoms";
import { InputAdornment } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

export const CreateTransactionAmount = () => {
  return (
    <Grid2 xs={1}>
      <TextInput
        fullWidth
        name="amount"
        label="Сумма"
        isFloatinLabel
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="start">₽</InputAdornment>,
        }}
      />
    </Grid2>
  );
};
