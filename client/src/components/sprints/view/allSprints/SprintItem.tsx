import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import { FC, useState } from "react";
import { TGetSprintWithTotalSpendingsAndPlainDto } from "../../sprints.types";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { SPRINTS_QUERY_KEY, getSprintById } from "../../sprints.api";
import { EnvelopeItem } from "./EnvelopeItem";
import { TotalView } from "@/atoms";

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
        <Typography variant="subtitle1">
          <b>
            {dayjs(sprint.startDate).format("YYYY-MM-DD")} -{" "}
            {dayjs(sprint.endDate).format("YYYY-MM-DD")}
          </b>
        </Typography>
        <Typography ml={4} variant="subtitle1">
          <TotalView plan={sprint.totalPlain} fact={sprint.totalSpendings} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {getSprintInfo.data?.envelopes.map((envelope) => (
          <EnvelopeItem key={envelope.id} envelope={envelope} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
