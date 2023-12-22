import { TransactionsList } from "../components/transactionsTable";
import { CreateTransactionForm } from "../components/createTransactionForm";
import { Box } from "@mui/material";

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
