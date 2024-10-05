import {
  Alert,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { FC } from "react";

type OperationalLogTableAlertProps = {
  show: boolean;
  databaseHasNoDriver: boolean;
  databaseHasNoVehicle: boolean;
  databaseHasNoRoute: boolean;
};
export const OperationalLogTableAlert: FC<
  OperationalLogTableAlertProps
> = (props) => {
  const {
    databaseHasNoDriver,
    databaseHasNoVehicle,
    databaseHasNoRoute,
    show,
  } = props;

  const preventAddLogReasons: string[] = [];
  if (databaseHasNoDriver) {
    preventAddLogReasons.push("ยังไม่มีคนขับรถในฐานข้อมูล");
  }
  if (databaseHasNoVehicle) {
    preventAddLogReasons.push(
      "ยังไม่มีรถรับส่งในฐานข้อมูล"
    );
  }
  if (databaseHasNoRoute) {
    preventAddLogReasons.push("ยังไม่มีสายรถในฐานข้อมูล");
  }

  return (
    <Collapse in={show}>
      <Alert
        variant="outlined"
        severity="warning"
      >
        <Typography>
          ไม่สามารถเพิ่มประวัติการเดินรถได้ เพราะว่า
        </Typography>
        <List
          dense
          disablePadding
          sx={{
            listStyleType: "disc",
            pl: 4,
          }}
        >
          {preventAddLogReasons.map((reason, index) => (
            <ListItem
              key={"prevent-add-reason" + index}
              dense
              disablePadding
              sx={{ display: "list-item" }}
            >
              <ListItemText disableTypography>
                <Typography>{reason}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Alert>
    </Collapse>
  );
};
