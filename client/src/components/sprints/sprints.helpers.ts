import { TEditSprintDto, TGetSprintDto } from ".";

export const getSprintToEdit = (sprint: TGetSprintDto): TEditSprintDto => ({
  startDate: sprint.startDate,
  endDate: sprint.endDate,
  startSum: sprint.startSum,
});
