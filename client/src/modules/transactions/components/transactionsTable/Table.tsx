import { DataGrid } from "@mui/x-data-grid";

import { useTransactionsTableData } from "./hooks";

export const Table = () => {
  const [columns, rows] = useTransactionsTableData();
  return <DataGrid columns={columns} rows={rows} />;
};
