import { TGetTransactionDto } from "@/components/transactions";
import { TableRow, TableCell } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";

type TProps = {
  transaction: TGetTransactionDto;
};

export const EnvelopeTransaction: FC<TProps> = ({ transaction }) => {
  return (
    <TableRow key={transaction.id}>
      <TableCell>{dayjs(transaction.date).format("YYYY-MM-DD")}</TableCell>
      <TableCell>{transaction.amount}</TableCell>
      <TableCell>{transaction.comment}</TableCell>
    </TableRow>
  );
};
