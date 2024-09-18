import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { IndexPageLoaderData as DriverReportGeneralIndexPageLoaderData } from "./loader";

export const DriverReportGeneralIndexPage: FC = () => {
  const {
    reportEntries,
    driverSelectOptions,
    topicComboBoxOptions,
  } =
    useLoaderData() as DriverReportGeneralIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        ตารางบันทึกเรื่องร้องเรียนคนขับรถ
      </Typography>
      <DriverReportGeneralTable
        entries={reportEntries}
        slotProps={{
          form: {
            driverSelect: {
              options: driverSelectOptions,
            },
            topicComboBox: {
              options: topicComboBoxOptions,
            },
          },
        }}
      />
    </Stack>
  );
};
