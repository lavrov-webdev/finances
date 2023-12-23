import { Box } from "@mui/material";

import { CreateTransactionForm } from "../components/createTransactionForm";
import { TransactionsList } from "../components/transactionsTable";

export const CreateTransactionPage = () => {

  return (
    <Box maxWidth={900}>
      <CreateTransactionForm />
      <Box mt={8}>
        <TransactionsList />
      </Box>
    </Box>
  );
};
