import { DataGrid } from "@mui/x-data-grid";
import { useTransactionsTableData } from "./helpers";
import { EditTransactionModal } from "./EditTransactionModal";

export const AllTransactionsPage = () => {
  const [columns, rows] = useTransactionsTableData();

  return (
    <>
      <DataGrid columns={columns} rows={rows} />
      <EditTransactionModal />
    </>
  );
};
