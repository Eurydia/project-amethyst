import { VehicleReportInspectionInfoGroup } from "$components/VehicleReportInspectionInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { VehicleReportInspectionInfoPageLoaderData } from "./loader";

export const VehicleReportInspectionInfoPage: FC = () => {
  const { report, vehicle, topicComboBoxOptions } =
    useLoaderData() as VehicleReportInspectionInfoPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        {vehicle.license_plate}
      </Typography>
      <Typography variant="h2">
        ผลการตรวจสภาพรถรับส่ง
      </Typography>
      <VehicleReportInspectionInfoGroup
        report={report}
        vehicle={vehicle}
        slotProps={{
          form: {
            topicComboBox: {
              options: topicComboBoxOptions,
            },
          },
        }}
      />
    </Stack>
  );
};
