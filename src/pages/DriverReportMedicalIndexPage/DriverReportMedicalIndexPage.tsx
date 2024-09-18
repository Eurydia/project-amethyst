import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { DriverReportMedicalIndexPageLoaderData } from "./loader";

export const DriverReportMedicalIndexPage: FC = () => {
  const {
    reportEntries,
    driverSelectOptions,
    topicComboBoxOptions,
  } =
    useLoaderData() as DriverReportMedicalIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        ตารางบันทึกผลการตรวจสารเสพติด
      </Typography>
      <DriverReportMedicalTable
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
