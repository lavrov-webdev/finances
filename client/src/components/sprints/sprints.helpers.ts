import { TEditSprintDto, TGetSprintDto } from "./sprints.types";

export const getSprintToEdit = (sprint: TGetSprintDto): TEditSprintDto => ({
  startDate: sprint.startDate,
  endDate: sprint.endDate,
  startSum: sprint.startSum,
});
