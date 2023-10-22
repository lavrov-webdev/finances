import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateTransactionDto,
  TCreateTransactionDto,
} from "../../transactions.types";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  CreateTransactionDate,
  CreateTransactionSelectEnvelope,
  CreateTransactionAmount,
  CreateTransactionComment,
} from "./fields";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TRANSACTIONS_QUERY_KEY,
  createTransaction,
} from "../../transactions.api";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { FormDevTool } from "@/atoms";

export const CreateTransactionPage = () => {
  const form = useForm<TCreateTransactionDto>({
    resolver: zodResolver(CreateTransactionDto),
  });
  const queryClient = useQueryClient();

  const createTransactionMutate = useMutation({
    mutationFn: createTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries([TRANSACTIONS_QUERY_KEY]);
      form.setValue("amount", 0);
      form.setValue("comment", "");
      const amountInput = document.querySelector('input[name="amount"]') as HTMLInputElement
      amountInput.focus()
      toast("Создана новая транзакция", {
        type: "success",
      });
    },
  });

  const handleSubmit = (data: TCreateTransactionDto) => {
    createTransactionMutate.mutate(data);
  };

  return (
    <Box maxWidth={600}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormProvider {...form}>
          <Grid2 container spacing={2} columns={1}>
            <CreateTransactionDate />
            <CreateTransactionAmount />
            <CreateTransactionSelectEnvelope />
            <CreateTransactionComment />
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
    </Box>
  );
};
