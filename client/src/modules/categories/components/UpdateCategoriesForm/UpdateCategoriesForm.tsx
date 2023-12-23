import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormDevTool } from "@/atoms";
import { CATEGORIES_QUERY_KEY, getAllCategories, TUpdateCategoriesFormFields, updateCategories,UpdateCategoriesFormFields } from "@/modules/categories/index.ts";

import { CreateCategories } from "./CreateCategories.tsx";
import { EditCategories } from "./EditCategories.tsx";

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
        <FormDevTool />
      </FormProvider>
    </form>
  );
};
