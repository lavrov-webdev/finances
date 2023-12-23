import { Button } from "@mui/material";
import { FC } from "react";
import { AmountInput, DatePicker, Modal } from "@/atoms";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TEditSprintDto, useSrpintsStore, editSprint, SPRINTS_QUERY_KEY } from "..";

type TProps = {
  sprint: TEditSprintDto;
  sprintId: number;
};

export const EditSprintModal: FC<TProps> = ({ sprint, sprintId }) => {
  const store = useSrpintsStore();

  const form = useForm<TEditSprintDto>({
    defaultValues: {
      ...sprint,
    },
  });

  const queryClient = useQueryClient();
  const editSprintMutate = useMutation({
    mutationFn: editSprint,
    onSuccess: async () => {
      await queryClient.invalidateQueries([SPRINTS_QUERY_KEY]);
      store.clearEditableSprint();
    },
  });

  const openSprintToEdit = () => {
    store.setEditableSprint(sprint);
  };

  const handleSubmit = (data: TEditSprintDto) => {
    editSprintMutate.mutate({ editSprintDto: data, id: sprintId });
  };

  return (
    <>
      <Button onClick={openSprintToEdit}>
        Редактировать
      </Button>
      <Modal
        title="Редактировать спринт"
        onClose={store.clearEditableSprint}
        isOpen={!!store.editableSprint}
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormProvider {...form}>
            <Grid2 rowGap={3} container mt={4} columns={1}>
              <Grid2 xs={1}>
                <AmountInput
                  name="startSum"
                  label="Стартовая сумма"
                  fullWidth
                />
              </Grid2>
              <Grid2 xs={1}>
                <DatePicker
                  name="startDate"
                  defaultDate={dayjs(sprint.startDate)}
                  label="Дата начала"
                />
              </Grid2>
              <Grid2 xs={1}>
                <DatePicker
                  name="endDate"
                  defaultDate={dayjs(sprint.endDate)}
                  label="Дата завершения"
                />
              </Grid2>
              <Grid2 xs={1}>
                <Button fullWidth type="submit" variant="contained">
                  Редактировать
                </Button>
              </Grid2>
            </Grid2>
          </FormProvider>
        </form>
      </Modal>
    </>
  );
};
