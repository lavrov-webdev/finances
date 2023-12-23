import { Alert, Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { AppLink } from "@/atoms";
import { groupBy } from "@/helpres";

import { getSprints, SPRINTS_QUERY_KEY } from "../../sprints.api";
import { SprintItem } from "./SprintItem";

export const SprintsList = () => {
  const sprintsQuery = useQuery({
    queryFn: getSprints,
    queryKey: [SPRINTS_QUERY_KEY],
  });
  const sprintsGroupedByYear = groupBy(sprintsQuery.data || [], (sprint) =>
    dayjs(sprint.startDate).year().toString(),
  );
  const sprintsList = Object.entries(sprintsGroupedByYear).map(
    ([year, sprints]) => (
      <Box marginY={6} key={year}>
        <Box mb={2}>
          <Typography variant="h5">{year}</Typography>
        </Box>
        <Grid2 gap={3} container columns={6}>
          {sprints.map((sprint) => (
            <SprintItem key={sprint.id} sprint={sprint} />
          ))}
        </Grid2>
      </Box>
    ),
  );
  if (!sprintsList) return null;
  return (
    <Box width="90%">
      {sprintsList?.length > 0 ? (
        sprintsList
      ) : (
        <Alert severity="warning">
          Вы пока не начали ни одного спрнита, перейдите на{" "}
          <AppLink to="/sprints/new">страницу создания</AppLink>
        </Alert>
      )}
    </Box>
  );
};
