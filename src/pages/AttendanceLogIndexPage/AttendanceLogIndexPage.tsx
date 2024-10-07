import { AttendanceLogTable } from "$components/AttendanceLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { AttendanceLogIndexPageLoaderData } from "./loader";

export const AttendanceLogIndexPage: FC = () => {
  const { logEntries } =
    useLoaderData() as AttendanceLogIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        ตารางบันทึกเวลารับเข้าและรับออก
      </Typography>
      <AttendanceLogTable entries={logEntries} />
    </Stack>
  );
};
