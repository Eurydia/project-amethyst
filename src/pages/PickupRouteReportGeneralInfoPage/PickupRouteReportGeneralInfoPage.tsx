/** @format */

import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { PickupRouteReportGeneralInfoGroup } from "$components/PickupRouteReportGeneralInfoGroup";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { PickupRouteReportGeneralInfoPageLoaderData } from "./loader";

export const PickupRouteReportGeneralInfoPage: FC = () => {
  const { report, route, topicComboBoxOptions } =
    useLoaderData() as PickupRouteReportGeneralInfoPageLoaderData;

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/pickup-routes/report/general/">
        <KeyboardArrowLeftRounded />
        ตารางบันทึกเรื่องร้องเรียนสายรถ
      </BaseTypographyLink>
      <Typography variant="h1">{route.name}</Typography>
      <Typography variant="h2">ข้อมูลเรื่องร้องเรียนสายรถ</Typography>
      <PickupRouteReportGeneralInfoGroup
        report={report}
        route={route}
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
