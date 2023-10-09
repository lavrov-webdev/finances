import {
  CATEGORIES_QUERY_KEY,
  getAllCategories,
} from "@/components/categories/categories.api.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateSprintDto, TCreateSprintDto } from "../../sprints.types.ts";
import { StartSprintDates } from "./startSprintDates/StartSprintDates.tsx";
import { StartSprintEnvelopes } from "./startSprintsEnvelopes/StartSprintEnvelopes.tsx";
import { SPRINTS_QUERY_KEY, createSprint } from "../../sprints.api.ts";
import { AppLink, FormDevTool } from "@/atoms";
import { StartSum } from "./startSprintStartSum/StartSum";

export const StartSprintPage = () => {
  const form = useForm<TCreateSprintDto>({
    resolver: zodResolver(CreateSprintDto),
    defaultValues: {
      startDate: new Date(dayjs().format("YYYY-MM-DD")),
      startSum: 0,
    },
  });

  const categoriesQuery = useQuery({
    queryFn: getAllCategories,
    queryKey: [CATEGORIES_QUERY_KEY],
  });

  const envelopes = useMemo(
    () =>
      categoriesQuery.data?.reduce((acc, category) => {
        if (category.isActive) {
          acc.push({
            categoryId: category.id,
            amount: 0,
          });
        }
        return acc;
      }, [] as TCreateSprintDto["envelopes"]) || [],
    [categoriesQuery.data]
  );
  const queryClient = useQueryClient();
  const createSprintMutation = useMutation({
    mutationFn: createSprint,
    onSuccess: async () => {
      await queryClient.invalidateQueries([SPRINTS_QUERY_KEY]);
      toast("Успешно создан новый спринт", { type: "success" });
      form.setValue("envelopes", envelopes);
    },
  });

  useEffect(() => {
    form.setValue("envelopes", envelopes);
  }, [envelopes, form]);

  const submitHandler = (data: TCreateSprintDto) => {
    createSprintMutation.mutate(data);
  };

  if (!categoriesQuery.data) return null;

  return (
    <Box maxWidth={600}>
      {categoriesQuery.data.length === 0 ? (
        <Alert severity="warning">
          Вы пока не создали ни одной категории. <br />
          Без них не получится начать новый спринт. <br />
          Создайте несколько на странице{" "}
          <AppLink to="/categories">обновления категорий</AppLink>
        </Alert>
      ) : (
        <form onSubmit={form.handleSubmit(submitHandler)}>
          <FormProvider {...form}>
            <StartSprintDates />
            <StartSum />
            <StartSprintEnvelopes />
            <Box mt={5}>
              <Button fullWidth size="large" variant="contained" type="submit">
                Начать спринт
              </Button>
            </Box>
            <FormDevTool />
          </FormProvider>
        </form>
      )}
    </Box>
  );
};
