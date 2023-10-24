import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { TGetSprintWithTotalSpendingsAndPlainDto } from "../../sprints.types";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getSprintById, SPRINTS_QUERY_KEY } from "../../sprints.api";
import { EnvelopeItem } from "./EnvelopeItem";
import { TotalView } from "@/atoms";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { EditSprintModal } from "./EditSrpitnModal";
import { getSprintToEdit } from "../../sprints.helpers";
import { separateThousand } from "@/helpres";

type TProps = {
  sprint: TGetSprintWithTotalSpendingsAndPlainDto;
};

export const SprintItem: FC<TProps> = ({ sprint }) => {
  const [isFetchStart, setIsFetchStart] = useState(false);
  const getSprintInfo = useQuery({
    queryFn: () => getSprintById(sprint.id),
    queryKey: [SPRINTS_QUERY_KEY, sprint.id],
    enabled: isFetchStart,
  });
  return (
    <Accordion onChange={(_, isExpanded) => setIsFetchStart(isExpanded)}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id={sprint.id.toString()}
        href={`sprint.${sprint.id}`}
      >
        <Grid2 columns={1} gap={4} container>
          <Grid2 xs={1}>
            <Typography variant="subtitle1">
              <b>
                {dayjs(sprint.startDate).format("YYYY-MM-DD")} -{" "}
                {dayjs(sprint.endDate).format("YYYY-MM-DD")}
              </b>
            </Typography>
          </Grid2>
          <Grid2 xs={1}>
            <Typography variant="subtitle1">
              <TotalView
                plan={sprint.totalPlain}
                fact={sprint.totalSpendings}
                direction="column"
              />
            </Typography>
          </Grid2>
        </Grid2>
      </AccordionSummary>
      <AccordionDetails>
        <Grid2 container columnGap={4} mb={4}>
          <Grid2 alignContent="center" container>
            <Typography variant="subtitle2">
              Стартовый баланс:{" "}
              {separateThousand(getSprintInfo.data?.startSum || 0)}
            </Typography>
          </Grid2>
          <Grid2 alignContent="center" container>
            <Typography variant="subtitle2">
              Текущий баланс:{" "}
              {separateThousand(getSprintInfo.data?.currentBalance || 0)}
            </Typography>
          </Grid2>
          <Grid2>
            <EditSprintModal
              sprint={getSprintToEdit(sprint)}
              sprintId={sprint.id}
            />
          </Grid2>
        </Grid2>
        {getSprintInfo.data?.envelopes.map((envelope) => (
          <EnvelopeItem key={envelope.id} envelope={envelope} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
