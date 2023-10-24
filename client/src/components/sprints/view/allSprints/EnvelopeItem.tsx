import { TGetEnvelopeWithTransactionsDto } from "@/components/envelopes";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { EnvelopeTransaction } from "./EnvelopeTransaction";
import { TotalView } from "@/atoms";
import {
  CATEGORIES_QUERY_KEY,
  getAllCategories,
} from "@/components/categories";
import { useQuery } from "@tanstack/react-query";
import Grid2 from "@mui/material/Unstable_Grid2";

type TProps = {
  envelope: TGetEnvelopeWithTransactionsDto;
};

export const EnvelopeItem: FC<TProps> = ({ envelope }) => {
  const categoriesQuery = useQuery({
    queryFn: getAllCategories,
    queryKey: [CATEGORIES_QUERY_KEY],
  });
  const totalSpendings = envelope.transactions.reduce(
    (acc, curr) => acc + curr.amount,
    0,
  );
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id={envelope.id.toString()}
        href={`#envelope.${envelope.id}`}
      >
        <Box width="100%">
          <Grid2 container columns={5}>
            <Grid2 xs={1}>
              <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
                <Typography variant="subtitle1">
                  <b>
                    {categoriesQuery.data?.find(
                      (category) => category.id === envelope.categoryId,
                    )?.name}
                  </b>
                </Typography>
              </div>
            </Grid2>
            <Grid2 xs={4}>
              <Typography ml={5} variant="subtitle1">
                <TotalView plan={envelope.amount} fact={totalSpendings} direction="row" />
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Дата</TableCell>
                <TableCell>Сумма</TableCell>
                <TableCell>Комментарий</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {envelope.transactions.map((transaction) => (
                <EnvelopeTransaction
                  transaction={transaction}
                  key={transaction.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );
};
