import { Grid } from "@mui/material";
import dayjs from "dayjs";

import { DatePicker, FormSubtitle } from "@/atoms";

export const Dates = () => {
  return (
    <>
      <FormSubtitle text="Даты" />
      <Grid container columns={2} rowSpacing={2} columnSpacing={3}>
        <Grid item xs={1}>
          <DatePicker
            isFloating
            name="startDate"
            label="Дата начала"
            defaultDate={dayjs()}
          />
        </Grid>
        <Grid item xs={1}>
          <DatePicker
            disablePast
            isFloating
            name="endDate"
            label="Дата завершения"
          />
        </Grid>
      </Grid>
    </>
  );
};
