/** @format */

import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { PickupRouteReportGeneralIndexPageLoaderData } from "./loader";

export const PickupRouteReportGeneralIndexPage: FC = () => {
  const { reportEntries, routeSelectOptions, topicComboBoxOptions } =
    useLoaderData() as PickupRouteReportGeneralIndexPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1">ตารางบันทึกเรื่องร้องเรียนสายรถ</Typography>
      <PickupRouteReportGeneralTable
        reportEntries={reportEntries}
        slotProps={{
          form: {
            routeSelect: { options: routeSelectOptions },
            topicComboBox: {
              options: topicComboBoxOptions,
            },
          },
        }}
      />
    </Stack>
  );
};
