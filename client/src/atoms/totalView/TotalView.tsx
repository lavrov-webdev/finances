import { separateThousand } from "@/helpres";
import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC } from "react";

type TProps = {
  plan: number;
  fact: number;
  direction: "column" | "row"
};
export const TotalView: FC<TProps> = ({ plan, fact, direction }) => {
  const isHorizontal = direction === "column"
  return (
    <Box width="100%">
      <Grid2 container columns={isHorizontal ? 1 : 3}>
        <Grid2 xs={1}>
          <b>Расход плановый:</b> {separateThousand(plan)}
        </Grid2>
        <Grid2 xs={1}>
          <b>Расход фактический:</b> {separateThousand(fact)}
        </Grid2>
        <Grid2 xs={1}>
          <b>Осталось по плану:</b> {separateThousand(plan - fact)}
        </Grid2>
      </Grid2>
    </Box>
  );
};
