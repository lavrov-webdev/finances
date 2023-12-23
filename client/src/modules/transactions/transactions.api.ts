import { appAxios } from "@/config";

import {
  TCreateTransactionDto,
  TEditTransactionDto,
  TGetTransactionDto,
  TGetTransactionsWithCategoryName,
} from ".";

export const TRANSACTIONS_QUERY_KEY = "transactions";

export const createTransaction = async (transaction: TCreateTransactionDto) => {
  const { data } = await appAxios.post("/transactions", transaction);
  return data;
};

export const getTransactions = async () => {
  const { data } =
    await appAxios.get<TGetTransactionsWithCategoryName[]>("/transactions");
  return data;
};

export const getSprintTransactions = async (sprintId: number) => {
  const { data } = await appAxios.get<TGetTransactionsWithCategoryName[]>(
    `/transactions/${sprintId}`,
  );
  return data;
};

export const editTransaction = async ({
  editTransaction,
  id,
}: {
  editTransaction: TEditTransactionDto;
  id: number;
}) => {
  const { data } = await appAxios.patch<TGetTransactionDto>(
    "/transactions/" + id,
    editTransaction,
  );
  return data;
};

export const deleteTransaction = async (id: number) => {
  const { data } = await appAxios.delete<TGetTransactionDto>(
    "/transactions/" + id,
  );
  return data;
};
