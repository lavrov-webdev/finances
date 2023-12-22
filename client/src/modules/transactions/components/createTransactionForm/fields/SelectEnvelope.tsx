import { useFormContext, useWatch } from "react-hook-form";
import { TCreateTransactionDto } from "../../../transactions.types";
import { useEffect, useState } from "react";
import { TGetEnvelopesWithCategoryNameAndSprintDates } from "@/modules/envelopes";
import { useTransactionsStore } from "../../..";
import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const SelectEnvelope = () => {
  const form = useFormContext<TCreateTransactionDto>();
  const getEnvelopesByDate = useTransactionsStore(
    (store) => store.getEnvelopesByDate
  );
  const [envelopes, setEnvelopes] = useState<
    TGetEnvelopesWithCategoryNameAndSprintDates[]
  >([]);
  const date = useWatch({ name: "date", control: form.control });

  useEffect(() => {
    const updateEnvelopes = async () => {
      if (date) {
        const newEnvelopes = await getEnvelopesByDate(new Date(date));
        setEnvelopes(newEnvelopes);
      }
    };
    updateEnvelopes();
  }, [getEnvelopesByDate, date]);

  const error = form.formState.errors.envelopeId?.message?.toString();

  return (
    <Grid2 xs={1}>
      <FormControl fullWidth>
        <Autocomplete
          disablePortal
          fullWidth
          autoHighlight
          openOnFocus
          id="select-envelope"
          options={envelopes.map((envelope) => ({
            label: envelope.category.name,
            value: envelope.id,
          }))}
          {...form.register("envelopeId")}
          onChange={(_, newValue) => {
            if (newValue?.value) {
              form.setValue("envelopeId", +newValue?.value);
            } else {
              form.resetField("envelopeId");
            }
          }}
          renderInput={(params) => (
            <TextField {...params} fullWidth label="Конверт" />
          )}
        />
        {!!error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </Grid2>
  );
};
