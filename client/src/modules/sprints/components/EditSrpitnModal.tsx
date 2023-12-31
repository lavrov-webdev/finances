import { Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { AmountInput, DatePicker, Modal } from "@/atoms";

import {
  editSprint,
  SPRINTS_QUERY_KEY,
  TEditSprintDto,
  useSrpintsStore,
} from "..";

type TProps = {
  sprint: TEditSprintDto;
  sprintId: number;
};

export const EditSprintModal: FC<TProps> = ({ sprint, sprintId }) => {
  const store = useSrpintsStore();
  const form = useForm<TEditSprintDto>({
    defaultValues: {
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      startSum: sprint.startSum,
    },
  });

  const queryClient = useQueryClient();
  const editSprintMutate = useMutation({
    mutationFn: editSprint,
    onSuccess: async () => {
      await queryClient.invalidateQueries([SPRINTS_QUERY_KEY]);
      toast("Спринт обновлён", { type: "success" });
      store.clearEditableSprint();
    },
    onError: () => {
      toast("Couldn't edit sprint", { type: "error" });
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
      <Button onClick={openSprintToEdit}>Редактировать</Button>
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
