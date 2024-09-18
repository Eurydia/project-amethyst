import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { VehicleReportGeneralIndexPageLoaderData } from "./loader";

export const VehicleReportGeneralIndexPage: FC = () => {
  const {
    reportEntries,
    topicComboBoxOptions,
    vehicleSelectOptions,
  } =
    useLoaderData() as VehicleReportGeneralIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        ตารางบันทึกเรื่องร้องเรียนรถรับส่ง
      </Typography>
      <VehicleReportGeneralTable
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
