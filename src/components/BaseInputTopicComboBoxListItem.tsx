import { DeleteRounded } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { TypographyTooltip } from "./TypographyTooltip";

type BaseInputTopicComboBoxListItemProps = {
  label: string;
  onClick: () => void;
  isBold?: boolean;
};
export const BaseInputTopicComboBoxListItem: FC<
  BaseInputTopicComboBoxListItemProps
> = (props) => {
  const { isBold, onClick, label } = props;
  return (
    <ListItem
      dense
      disablePadding
      sx={{
        display: "inline",
        width: "auto",
      }}
    >
      <TypographyTooltip
        title="ลบหัวข้อ"
        arrow
      >
        <ListItemButton
          disableRipple
          disableTouchRipple
          onClick={onClick}
        >
          <ListItemIcon>
            <DeleteRounded />
          </ListItemIcon>
          <ListItemText disableTypography>
            <Typography
              sx={{
                fontWeight: isBold ? "bold" : undefined,
                display: "flex",
                flexDirection: "row",
              }}
            >
              {label}
            </Typography>
          </ListItemText>
        </ListItemButton>
      </TypographyTooltip>
    </ListItem>
  );
};
