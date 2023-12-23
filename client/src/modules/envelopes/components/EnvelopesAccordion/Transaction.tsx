import { TableCell, TableRow } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";

import { separateThousand } from "@/helpres";
import { TGetTransactionDto } from "@/modules/transactions";

type TProps = {
  transaction: TGetTransactionDto;
};

export const EnvelopeTransaction: FC<TProps> = ({ transaction }) => {
  return (
    <TableRow key={transaction.id}>
      <TableCell>{dayjs(transaction.date).format("YYYY-MM-DD")}</TableCell>
      <TableCell>{separateThousand(transaction.amount)}</TableCell>
      <TableCell>{transaction.comment}</TableCell>
    </TableRow>
  );
};
