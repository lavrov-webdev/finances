import { Button, IconButton } from "@mui/material";
import { useSrpintsStore } from "../../sprints.store";
import { Edit } from "@mui/icons-material";
import { TEditSprintDto } from "../../sprints.types";
import { FC } from "react";
import { DatePicker, Modal, TextInput } from "@/atoms";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SPRINTS_QUERY_KEY, editSprint } from "../../sprints.api";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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
      <IconButton onClick={openSprintToEdit}>
        <Edit />
      </IconButton>
      <Modal
        title="Редактировать спринт"
        onClose={store.clearEditableSprint}
        isOpen={!!store.editableSprint}
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormProvider {...form}>
            <Grid2 rowGap={3} container mt={4} columns={1}>
              <Grid2 xs={1}>
                <TextInput
                  name="startSum"
                  type="number"
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
