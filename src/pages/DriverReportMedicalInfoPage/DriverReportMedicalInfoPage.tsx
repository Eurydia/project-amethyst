import { DriverReportMedicalInfoGroup } from "$components/DriverReportMedicalInfoGroup";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { DriverReportMedicalInfoPageLoaderData } from "./loader";

export const DriverReportMedicalInfoPage: FC = () => {
  const { report, driver, topicComboBoxOptions } =
    useLoaderData() as DriverReportMedicalInfoPageLoaderData;
  return (
    <Stack spacing={1}>
      <Typography variant="h1">{`${driver.name} ${driver.surname}`}</Typography>
      <Typography variant="h2">
        รายละเอียดผลการตรวจสารเสพติด
      </Typography>
      <DriverReportMedicalInfoGroup
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
