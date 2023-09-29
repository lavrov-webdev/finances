import { DatePicker, Modal, TextInput } from "@/atoms";
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
    <Modal
      isOpen={isEditModalOpen}
      onClose={closeEditModal}
      title="Редактировать транзакцию"
    >
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
    </Modal>
  );
};
