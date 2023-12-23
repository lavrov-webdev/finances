import { Box, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFieldArray, useFormContext } from "react-hook-form";

import { AmountInput, FormSubtitle } from "@/atoms";
import { CATEGORIES_QUERY_KEY, getAllCategories } from "@/modules/categories";
import { TCreateSprintDto } from "@/modules/sprints";

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
                  (categoory) => categoory.id === envelope.categoryId,
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
