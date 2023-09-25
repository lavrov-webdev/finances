import {Box, Divider, Typography} from "@mui/material";
import {FC} from "react";

type TProps = {
    text: string
}
export const FormSubtitle:FC<TProps> = ({text}) => {
    return <Box mb={2}>
        <Typography variant="h6">{text}</Typography>
        <Divider/>
    </Box>
};