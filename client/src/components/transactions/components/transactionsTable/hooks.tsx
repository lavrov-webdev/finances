import {
    getAllCategories,
    CATEGORIES_QUERY_KEY,
  } from "@/components/categories";
  import Delete from "@mui/icons-material/Delete";
  import { IconButton } from "@mui/material";
  import { GridColDef, GridRowParams } from "@mui/x-data-grid";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import dayjs from "dayjs";
  import { useMemo } from "react";
  import {
    deleteTransaction,
    getTransactions,
    TRANSACTIONS_QUERY_KEY,
    TTransactionTableRow,
    useTransactionsStore,
  } from "../..";
  import { Edit } from "@mui/icons-material";
  
  const useGetEditButtons = (params: GridRowParams<TTransactionTableRow>) => {
    const openEditModal = useTransactionsStore((state) => state.openEditModal);
  
    const handleEditButtonClick = () => {
      openEditModal(
        {
          date: params.row.date,
          comment: params.row.comment,
          amount: params.row.amount,
        },
        +params.id
      );
    };
  
    const queryClient = useQueryClient();
    const deleteTransactionMutate = useMutation({
      mutationFn: deleteTransaction,
      onSuccess: async () => {
        await queryClient.invalidateQueries([TRANSACTIONS_QUERY_KEY]);
      },
    });
  
    const onDelete = () => {
      deleteTransactionMutate.mutate(+params.id);
    };
  
    return [
      <IconButton onClick={handleEditButtonClick}>
        <Edit />
      </IconButton>,
      <IconButton disabled={deleteTransactionMutate.isLoading} onClick={onDelete}>
        <Delete />
      </IconButton>,
    ];
  };
  
  export const useTransactionsTableData = () => {
    const transactionsQuery = useQuery({
      queryFn: getTransactions,
      queryKey: [TRANSACTIONS_QUERY_KEY],
    });
    const categoriesQuery = useQuery({
      queryFn: getAllCategories,
      queryKey: [CATEGORIES_QUERY_KEY],
    });
  
    const categoriesFilter = useMemo(() => {
      return categoriesQuery.data?.map((category) => category.name);
    }, [categoriesQuery.data]);
  
    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 50 },
      {
        field: "date",
        headerName: "Дата",
        width: 100,
        type: "date",
        valueGetter: (row) => new Date(row.value),
        valueFormatter: (row) => dayjs(row.value).format("YYYY-MM-DD"),
      },
      {
        field: "amount",
        headerName: "Сумма",
        width: 100,
        type: "number",
      },
      {
        field: "categoryName",
        headerName: "Категория",
        width: 150,
        type: "singleSelect",
        valueOptions: categoriesFilter,
      },
      {
        field: "comment",
        headerName: "Комментарий",
        width: 280,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Действия",
        getActions: useGetEditButtons,
      },
    ];
  
    const rows = useMemo(() => {
      return (
        transactionsQuery.data?.map((transaction) => ({
          date: transaction.date,
          amount: transaction.amount,
          categoryName: transaction.category.name,
          comment: transaction.comment,
          id: transaction.id,
        })) || []
      );
    }, [transactionsQuery.data]);
  
    return [columns, rows] as const;
  };
  