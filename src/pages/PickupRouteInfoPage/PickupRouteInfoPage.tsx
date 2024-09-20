import { BaseTOC } from "$components/BaseTOC";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { PickupRouteInfoGroup } from "$components/PickupRouteInfoGroup";
import { PickupRouteReportGeneralTable } from "$components/PickupRouteReportGeneralTable";
import { TRANSLATION } from "$locale/th";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { PickupRouteInfoPageLoaderData } from "./loader";

const TOC_ITEMS: {
  label: string;
  href: string;
}[] = [
  {
    label: "ข้อมูลสายรถ",
    href: "#info",
  },
  {
    label: TRANSLATION.operationalLogTable,
    href: "#operational-log",
  },
  {
    label: "ตารางบันทึกเรื่องร้องเรียนสายรถ",
    href: "#report-general",
  },
];

export const PickupRouteInfoPage: FC = () => {
  const {
    route,
    logEntries,
    reportEntries,
    driverSelectOptions,
    vehicleSelectOptions,
    topicComboBoxOptions,
  } = useLoaderData() as PickupRouteInfoPageLoaderData;

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/pickup-routes">
        <KeyboardArrowLeftRounded />
        รายชื่อสายรถ
      </BaseTypographyLink>
      <Typography
        variant="h1"
        sx={{
          overflow: "hidden",
          wordBreak: "keep-all",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {route.name}
      </Typography>
      <BaseTOC>{TOC_ITEMS}</BaseTOC>
      <Typography variant="h2" id="info">
        ข้อมูลสายรถ
      </Typography>
      <PickupRouteInfoGroup route={route} />
      <Typography variant="h2" id="operational-log">
        {TRANSLATION.operationalLogTable}
      </Typography>
      <OperationalLogTable
        hideRouteColumn
        logEntries={logEntries}
        slotProps={{
          form: {
            vehicleSelect: {
              options: vehicleSelectOptions,
            },
            driverSelect: {
              options: driverSelectOptions,
            },
            routeSelect: {
              disabled: true,
              options: [route],
            },
          },
        }}
      />
      <Typography variant="h2" id="report-general">
        ตารางบันทึกเรื่องร้องเรียนสายรถ
      </Typography>
      <PickupRouteReportGeneralTable
        hideRouteColumn
        entries={reportEntries}
        slotProps={{
          form: {
            routeSelect: {
              disabled: true,
              options: [route],
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
