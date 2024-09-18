import { KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";

type BaseTOCItemProps = {
  label: string;
  href: string;
};
export const BaseTOCItem: FC<BaseTOCItemProps> = (
  props,
) => {
  const { label, href } = props;
  return (
    <ListItem disablePadding disableGutters>
      <ListItemText disableTypography>
        <Typography component="a" href={href}>
          <KeyboardArrowRightRounded />
          {label}
        </Typography>
      </ListItemText>
    </ListItem>
  );
};
