import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormDevTool } from "@/atoms";
import { SPRINTS_QUERY_KEY } from "@/modules/sprints/sprints.api";

import {
  createTransaction,
  CreateTransactionDto,
  TCreateTransactionDto,
  TRANSACTIONS_QUERY_KEY,
} from "../..";
import { Amount, Comment, Date, SelectEnvelope } from "./fields";

export const CreateTransactionForm = () => {
  const form = useForm<TCreateTransactionDto>({
    resolver: zodResolver(CreateTransactionDto),
  });
  const queryClient = useQueryClient();

  const createTransactionMutate = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        TRANSACTIONS_QUERY_KEY,
        SPRINTS_QUERY_KEY,
      ]);
      form.setValue("amount", 0);
      form.setValue("comment", "");
      const amountInput = document.querySelector(
        'input[name="amount"]',
      ) as HTMLInputElement;
      amountInput.focus();
      toast("Создана новая транзакция", {
        type: "success",
      });
    },
  });

  const handleSubmit = (data: TCreateTransactionDto) => {
    createTransactionMutate.mutate(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FormProvider {...form}>
        <Grid2 container spacing={2} columns={4}>
          <Date />
          <Amount />
          <SelectEnvelope />
          <Comment />
        </Grid2>
        <Box mt={5}>
          <LoadingButton
            loading={createTransactionMutate.isLoading}
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Добавить расход
          </LoadingButton>
        </Box>
        <FormDevTool />
      </FormProvider>
    </form>
  );
};
