import { AmountInput, FormSubtitle } from "@/atoms";
import {
  getAllCategories,
  CATEGORIES_QUERY_KEY,
} from "@/modules/categories";
import { TCreateSprintDto } from "@/modules/sprints";
import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useFormContext } from "react-hook-form";

export const Envelopes = () => {
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
            <AmountInput
              fullWidth
              name={`envelopes.${id}.amount`}
              label={
                categoriesQuery.data?.find(
                  (categoory) => categoory.id === envelope.categoryId
                )?.name
              }
              error={form.formState.errors.envelopes?.[id]?.amount?.message}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};