/** @format */

import { DriverReportGeneralInfoGroup } from "$components/DriverReportGeneralInfoGroup";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { DriverReportGeneralInfoPageLoaderData } from "./loader";

export const DriverReportGeneralInfoPage: FC = () => {
  const { report, driver, topicComboBoxOptions } =
    useLoaderData() as DriverReportGeneralInfoPageLoaderData;
  return (
    <Stack spacing={1}>
      <Typography variant="h1">{`${driver.name} ${driver.surname}`}</Typography>
      <Typography variant="h2">
        รายละเอียดเรื่องร้องเรียนคนขับรถ
      </Typography>
      <DriverReportGeneralInfoGroup
        report={report}
        driver={driver}
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
