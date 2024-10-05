import {
  Checkbox,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";

type BaseInputMultiSelectItemProps = {
  isChecked?: boolean;
  isBold?: boolean;
  isDisabled?: boolean;
  label: string;
  onClick: () => void;
};
export const BaseInputMultiSelectItem: FC<
  BaseInputMultiSelectItemProps
> = (props) => {
  const { isBold, isChecked, isDisabled, onClick, label } =
    props;

  return (
    <ListItem
      dense
      disableGutters
      disablePadding
      sx={{
        display: "inline",
        width: "auto",
      }}
    >
      <ListItemButton
        disableRipple
        disabled={isDisabled}
        onClick={onClick}
      >
        <ListItemIcon>
          <Checkbox
            disableRipple
            disableFocusRipple
            disableTouchRipple
            checked={isChecked}
          />
        </ListItemIcon>
        <ListItemText disableTypography>
          <Typography
            sx={{
              fontWeight: isBold ? "bold" : "normal",
            }}
          >
            {label}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
