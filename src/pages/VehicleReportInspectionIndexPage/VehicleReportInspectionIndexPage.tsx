import { VehicleReportInspectionTable } from "$components/VehicleReportInspectionTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { VehicleReportInspectionIndexPageLoaderData } from "./loader";

export const VehicleReportInspectionIndexPage: FC = () => {
  const {
    reportEntries,
    topicComboBoxOptions,
    vehicleSelectOptions,
  } =
    useLoaderData() as VehicleReportInspectionIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        ตารางบันทึกผลการตรวจสภาพรถ
      </Typography>
      <VehicleReportInspectionTable
        entries={reportEntries}
        slotProps={{
          form: {
            vehicleSelect: {
              options: vehicleSelectOptions,
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
