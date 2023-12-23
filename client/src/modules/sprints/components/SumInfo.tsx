import { Box, Typography } from "@mui/material";
import { FC } from "react";

import { separateThousand } from "@/helpres";

type TProps = {
  sum: number;
  text: string;
};

export const SumInfo: FC<TProps> = ({ sum, text }) => {
  return (
    <Box marginY={3}>
      <Typography variant="h3">{separateThousand(sum, true)}</Typography>
      <Typography variant="h5">{text}</Typography>
    </Box>
  );
};
