import { KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";

type BaseTOCProps = {
  children: { label: string; href: string }[];
};
export const BaseTOC: FC<BaseTOCProps> = (props) => {
  const { children } = props;

  return (
    <List
      dense
      disablePadding
    >
      {children.map(({ label, href }, index) => (
        <ListItem
          key={"toc-item" + index}
          disablePadding
          disableGutters
        >
          <ListItemText disableTypography>
            <Typography
              component="a"
              href={href}
            >
              <KeyboardArrowRightRounded />
              {label}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
