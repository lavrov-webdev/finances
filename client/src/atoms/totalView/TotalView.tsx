import { Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FC } from "react";

import { separateThousand } from "@/helpres";

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
          {separateThousand(plan)}
        </Grid2>
        <Grid2 xs={1}>
          {separateThousand(fact)}
        </Grid2>
        <Grid2 xs={1}>
          {separateThousand(plan - fact)}
        </Grid2>
      </Grid2>
    </Box>
  );
};
