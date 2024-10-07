import { AttendanceLogTable } from "$components/AttendanceLogTable";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { HomePageLoaderData } from "./loader";

const ROUTES = [
  {
    path: "/drivers/report/general",
    label: "ตารางบันทึกเรื่องร้องเรียนคนขับรถ",
  },
  {
    path: "/drivers/report/medical",
    label: "ตารางบันทึกผลการตรวจสารเสพติด",
  },
  {
    path: "/vehicles/report/general",
    label: "ตารางบันทึกเรื่องร้องเรียนรถรับส่ง",
  },
  {
    path: "/vehicles/report/inspection",
    label: "ตารางบันทึกผลการตรวจสถาพรถรับส่ง",
  },
  {
    path: "/pickup-routes/report/general",
    label: "ตารางบันทึกเรื่องร้องเรียนสายรถ",
  },
];

export const HomePage: FC = () => {
  const { logEntries } =
    useLoaderData() as HomePageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">หน้าแรก</Typography>
      <Typography fontWeight="bold">ทางลัด</Typography>
      <List
        disablePadding
        dense
      >
        {ROUTES.map((route, index) => (
          <ListItem
            key={"route" + index}
            dense
            disableGutters
            disablePadding
          >
            <ListItemText disableTypography>
              <BaseTypographyLink to={route.path}>
                <KeyboardArrowRightRounded />
                {route.label}
              </BaseTypographyLink>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <Typography variant="h2">
        ตารางบันทึกเวลารับเข้าและรับออก
      </Typography>
      <AttendanceLogTable entries={logEntries} />
    </Stack>
  );
};
