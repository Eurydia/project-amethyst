import { Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

type BaseTypographyLinkProps = {
  to: string;
  children: ReactNode[] | ReactNode;
};
export const BaseTypographyLink: FC<
  BaseTypographyLinkProps
> = (props) => {
  const { children, to } = props;

  return (
    <Typography component={Link} to={to}>
      {children}
    </Typography>
  );
};
