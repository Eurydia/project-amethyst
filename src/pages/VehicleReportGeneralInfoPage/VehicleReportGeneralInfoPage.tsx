import { VehicleReportGeneralInfoGroup } from "$components/VehicleReportGeneralInfoGroup";
import { Stack, Typography } from "@mui/material";
import "dayjs/locale/th";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { VehicleReportGeneralInfoPageLoaderData } from "./loader";

export const VehicleReportGeneralInfoPage: FC = () => {
  const { report, vehicle, topicComboBoxOptions } =
    useLoaderData() as VehicleReportGeneralInfoPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">
        เรื่องร้องเรียนรถรับส่ง
      </Typography>
      <VehicleReportGeneralInfoGroup
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
