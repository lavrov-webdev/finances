import { FormDevTool } from "@/atoms";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { TCreateTransactionDto, CreateTransactionDto, createTransaction, TRANSACTIONS_QUERY_KEY } from "../..";
import { CreateTransactionDate, CreateTransactionAmount, CreateTransactionSelectEnvelope, CreateTransactionComment } from "./fields";
import { SPRINTS_QUERY_KEY } from "@/components/sprints/sprints.api";

export const CreateTransactionForm = () => {
    const form = useForm<TCreateTransactionDto>({
        resolver: zodResolver(CreateTransactionDto),
    });
    const queryClient = useQueryClient();

    const createTransactionMutate = useMutation({
        mutationFn: createTransaction,
        onSuccess: async () => {
            await queryClient.invalidateQueries([TRANSACTIONS_QUERY_KEY, SPRINTS_QUERY_KEY]);
            form.setValue("amount", 0);
            form.setValue("comment", "");
            const amountInput = document.querySelector('input[name="amount"]') as HTMLInputElement
            amountInput.focus()
            toast("Создана новая транзакция", {
                type: "success",
            });

        },
    });

    const handleSubmit = (data: TCreateTransactionDto) => {
        createTransactionMutate.mutate(data);
    };

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormProvider {...form}>
                <Grid2 container spacing={2} columns={4}>
                    <CreateTransactionDate />
                    <CreateTransactionAmount />
                    <CreateTransactionSelectEnvelope />
                    <CreateTransactionComment />
                </Grid2>
                <Box mt={5}>
                    <LoadingButton
                        loading={createTransactionMutate.isLoading}
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        Добавить расход
                    </LoadingButton>
                </Box>
                <FormDevTool />
            </FormProvider>
        </form>
    );
};
