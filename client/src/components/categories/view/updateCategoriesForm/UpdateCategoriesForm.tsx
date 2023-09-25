import { FormProvider, useForm } from "react-hook-form";
import { EditCategories } from "./editableCategories/EditCategories.tsx";
import { CreateCategories } from "./newCagtegories/CreateCategories.tsx";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CATEGORIES_QUERY_KEY,
  getAllCategories,
  updateCategories,
} from "../../categories.api.ts";
import {
  TUpdateCategoriesFormFields,
  UpdateCategoriesFormFields,
} from "../../categories.types.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Box } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { toast } from "react-toastify";

export const UpdateCategoriesForm = () => {
  const queryClient = useQueryClient();
  const categoriesQuery = useQuery({
    queryFn: getAllCategories,
    queryKey: [CATEGORIES_QUERY_KEY],
  });
  const form = useForm<TUpdateCategoriesFormFields>({
    resolver: zodResolver(UpdateCategoriesFormFields),
    mode: "onChange",
  });

  const updateCategoriesMutation = useMutation({
    mutationFn: updateCategories,
    onSuccess: async () => {
      await queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);
      form.setValue("newCategories", []);
      toast("Категории успешно обновлены", { type: "success" });
    },
  });

  useEffect(() => {
    form.setValue(
      "editableCategories",
      categoriesQuery.data?.filter((category) => category.isActive) || []
    );
  }, [categoriesQuery.data, form]);
  const onSubmit = (data: TUpdateCategoriesFormFields) => {
    updateCategoriesMutation.mutate(data);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Box>
          <EditCategories isLoading={categoriesQuery.isLoading} />
        </Box>
        <Box mt={5}>
          <CreateCategories />
        </Box>
        <Box mt={5}>
          <LoadingButton
            variant="contained"
            fullWidth
            loading={updateCategoriesMutation.isLoading}
            type="submit"
          >
            Обновить категории
          </LoadingButton>
        </Box>
        <DevTool control={form.control} />
      </FormProvider>
    </form>
  );
};
