import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormDevTool } from "@/atoms";
import {
  CATEGORIES_QUERY_KEY,
  getAllCategories,
} from "@/modules/categories/categories.api";

import { createSprint,CreateSprintDto, SPRINTS_QUERY_KEY, TCreateSprintDto } from "../..";
import { EmptyCategoriesAlert, SprintPreview } from "..";
import { Dates, Envelopes, StartSum } from "./fields";

export const StartSprintForm = () => {
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
    [categoriesQuery.data],
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
    <FormProvider {...form}>
      {categoriesQuery.data.length === 0
        ? <EmptyCategoriesAlert />
        : (
          <Box
            maxWidth={900}
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <Box maxWidth={600}>
              <form onSubmit={form.handleSubmit(submitHandler)}>
                <Dates />
                <StartSum />
                <Envelopes />
                <Box mt={5}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Начать спринт
                  </Button>
                </Box>
                <FormDevTool />
              </form>
            </Box>
            <SprintPreview />
          </Box>
        )}
    </FormProvider>
  );
};
