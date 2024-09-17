import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { PickupRouteReportGeneralIndexPageLoaderData } from "./loader";

export const PickupRouteReportGeneralIndexPage: FC = () => {
  const {
    reportEntries,
    routeSelectOptions,
    topicComboBoxOptions,
  } =
    useLoaderData() as PickupRouteReportGeneralIndexPageLoaderData;

  const databaseHasNoRoute =
    routeSelectOptions.length === 0;

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/">
        <KeyboardArrowLeftRounded />
        หน้าแรก
      </BaseTypographyLink>
      <Typography variant="h1">
        ตารางบันทึกเรื่องร้องเรียนสายรถ
      </Typography>
      <PickupRouteReportGeneralTable
        entries={reportEntries}
        slotProps={{
          form: {
            routeSelect: {
              disabled: databaseHasNoRoute,
              options: routeSelectOptions,
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
