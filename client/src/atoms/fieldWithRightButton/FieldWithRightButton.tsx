import { Grid } from "@mui/material";
import { FC } from "react";

type TProps = {
  field: React.ReactNode;
  button: React.ReactNode;
};
export const FieldWithRightButton: FC<TProps> = ({ field, button }) => {
  return (
    <Grid container columns={7} spacing={2}>
      <Grid item xs={6}>
        <Grid height="100%" container alignItems="center">
          {field}
        </Grid>
      </Grid>
      <Grid xs={1} item>
        <Grid
          height="100%"
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>{button}</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
