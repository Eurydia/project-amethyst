import {
  Button,
  ButtonProps,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";

type BaseInputButtomProps = {
  disabledReasons: string[];

  onClick: () => void;
  disabled: boolean | undefined;
  startIcon: ReactNode;
  children: ReactNode | ReactNode[];
  variant: ButtonProps["variant"];
};

export const BaseInputButton: FC<BaseInputButtomProps> = (
  props
) => {
  const {
    disabled,
    onClick,
    children,
    startIcon,
    variant,
  } = props;

  const button = (
    <Button
      variant={variant}
      startIcon={startIcon}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );

  if (!disabled) {
    return button;
  }

  return (
    <Tooltip
      title={
        <List
          dense
          disablePadding
          sx={{
            listStyleType: "disc",
            userSelect: "none",
            paddingLeft: 4,
          }}
        >
          {props.disabledReasons.map((reason, index) => (
            <ListItem
              key={"reason" + index}
              dense
              disableGutters
              disablePadding
              sx={{ display: "list-item" }}
            >
              <ListItemText disableTypography>
                <Typography
                  sx={{
                    wordBreak: "keep-all",
                    wordWrap: "normal",
                  }}
                >
                  {reason}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      }
    >
      <span>{button}</span>
    </Tooltip>
  );
};
