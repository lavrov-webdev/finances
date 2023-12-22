import { FC } from "react";
import dayjs from "dayjs";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { TGetSprintWithTotalSpendingsAndPlainDto } from "../..";

type TProps = {
  sprint: TGetSprintWithTotalSpendingsAndPlainDto;
};

export const SprintItem: FC<TProps> = ({ sprint }) => {
  return (
    <Grid2>
      <Link style={{ color: "inherit", textDecoration: "none" }} to={sprint.id.toString()}>
        <Card>
          <CardContent>
            <Typography variant="subtitle1">
              {dayjs(sprint.startDate).format("DD MMM")}{" - "}{dayjs(sprint.endDate).format("DD MMM")}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid2 >
  );
};
