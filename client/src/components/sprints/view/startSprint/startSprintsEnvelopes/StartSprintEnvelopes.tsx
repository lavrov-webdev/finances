import { FormSubtitle, TextInput } from "@/atoms";
import {
  getAllCategories,
  CATEGORIES_QUERY_KEY,
} from "@/components/categories";
import { TCreateSprintDto } from "@/components/sprints/sprints.types";
import { Box, Grid, InputAdornment } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useFormContext } from "react-hook-form";

export const StartSprintEnvelopes = () => {
  const form = useFormContext<TCreateSprintDto>();
  const categoriesQuery = useQuery({
    queryFn: getAllCategories,
    queryKey: [CATEGORIES_QUERY_KEY],
  });
  const envelopesFields = useFieldArray({
    control: form.control,
    name: "envelopes",
    keyName: "idRhf",
  });
  return (
    <Box mt={4}>
      <FormSubtitle text="Конверты" />
      <Grid container columns={1} rowSpacing={2}>
        {envelopesFields.fields.map((envelope, id) => (
          <Grid item xs={1} key={envelope.idRhf}>
            <TextInput
              fullWidth
              name={`envelopes.${id}.amount`}
              label={
                categoriesQuery.data?.find(
                  (categoory) => categoory.id === envelope.categoryId
                )?.name
              }
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">₽</InputAdornment>
                ),
              }}
              error={form.formState.errors.envelopes?.[id]?.amount?.message}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
