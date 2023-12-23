import { Link, LinkProps } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";

type TProps = {
  to: string;
} & LinkProps;

export const AppLink: FC<TProps> = ({ to, ...rest }) => {
  return <Link component={RouterLink} to={to} {...rest}></Link>;
};
