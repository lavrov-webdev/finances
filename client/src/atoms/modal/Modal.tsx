import { Box, Modal as MUIModal, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TProps = {
  onClose: () => void;
  isOpen: boolean;
  title: string;
};

export const Modal: FC<PropsWithChildren<TProps>> = ({
  onClose,
  isOpen,
  title,
  children,
}) => {
  return (
    <>
      <MUIModal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Box mb={4}>
            <Typography variant="h6">{title}</Typography>
            {children}
          </Box>
        </Box>
      </MUIModal>
    </>
  );
};
