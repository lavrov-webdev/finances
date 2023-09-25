import { DatePicker, TextInput } from "@/atoms";
import { Box, Modal, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  TEditTransactionDto,
  TRANSACTIONS_QUERY_KEY,
  editTransaction,
  useTransactionsStore,
} from "../..";
import { useEffect } from "react";
import dayjs from "dayjs";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const EditTransactionModal = () => {
  const {
    isEditModalOpen,
    closeEditModal,
    editableTransactionData,
    editableTransactionId,
  } = useTransactionsStore();
  const form = useForm<TEditTransactionDto>({
    defaultValues: editableTransactionData,
  });
  const queryClient = useQueryClient();
  const editTransactionMutate = useMutation({
    mutationFn: editTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries([TRANSACTIONS_QUERY_KEY]);
      closeEditModal();
    },
  });

  useEffect(() => {
    if (!editableTransactionData) {
      form.reset();
    } else {
      form.setValue("amount", editableTransactionData.amount);
      form.setValue("date", dayjs(editableTransactionData.date).toDate());
      form.setValue("comment", editableTransactionData.comment);
    }
  }, [editableTransactionData, form]);

  const handleSumbit = (formData: TEditTransactionDto) => {
    editTransactionMutate.mutate({
      editTransaction: {
        ...formData,
        amount: +formData.amount,
      },
      id: editableTransactionId!,
    });
  };
  return (
    <Modal open={isEditModalOpen} onClose={closeEditModal}>
      <Box sx={style}>
        <Box mb={4}>
          <Typography variant="h6">Редактировать транзакцию</Typography>
        </Box>
        <form onSubmit={form.handleSubmit(handleSumbit)}>
          <FormProvider {...form}>
            <Grid2 container rowGap={3} columns={1}>
              <Grid2 xs={1}>
                <DatePicker
                  defaultDate={dayjs(editableTransactionData?.date)}
                  label="Дата"
                  name="date"
                />
              </Grid2>
              <Grid2 xs={1}>
                <TextInput fullWidth label="Сумма" name="amount" />
              </Grid2>
              <Grid2 xs={1}>
                <TextInput fullWidth label="Комментарий" name="comment" />
              </Grid2>
              <Grid2 xs={1}>
                <LoadingButton
                  loading={editTransactionMutate.isLoading}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Редактировать
                </LoadingButton>
              </Grid2>
            </Grid2>
          </FormProvider>
        </form>
      </Box>
    </Modal>
  );
};
