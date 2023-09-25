import { useQuery } from "@tanstack/react-query";
import { SPRINTS_QUERY_KEY, getSprints } from "../../sprints.api";
import { SprintItem } from "./SprintItem";
import { Alert, Box } from "@mui/material";
import { AppLink } from "@/atoms";

export const AllSprintsPage = () => {
  const sprintsQuery = useQuery({
    queryFn: getSprints,
    queryKey: [SPRINTS_QUERY_KEY],
  });
  const sprintsList = sprintsQuery.data?.map((sprint) => (
    <SprintItem sprint={sprint} key={sprint.id} />
  ));
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
