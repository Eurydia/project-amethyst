import { BaseTOC } from "$components/BaseTOC";
import { DriverInfoGroup } from "$components/DriverInfoGroup";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { TRANSLATION } from "$locale/th";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { IndexPageLoaderData as DriverInfoPageLoaderData } from "./loader";

const TOC_ITEMS = [
  {
    label: TRANSLATION.driverInfoGroup,
    href: "#info",
  },
  {
    label: TRANSLATION.operationalLogTable,
    href: "#operational-log",
  },
  {
    label: TRANSLATION.driverGeneralReportTable,
    href: "#general-report",
  },
  {
    label: TRANSLATION.driverMedicalReportTable,
    href: "#medical-report",
  },
];

export const DriverInfoPage: FC = () => {
  const {
    driver,

    galleryDirPath,
    galleryFileEntries,

    logEntries,
    generalEntries,
    medicalEntries,
    vehicleSelectOptions,
    routeSelectOptions,
    topicComboBoxOptions,
  } = useLoaderData() as DriverInfoPageLoaderData;

  return (
    <Stack spacing={1}>
      <Typography variant="h1" id="info">
        {`${driver.name} ${driver.surname}`}
      </Typography>
      <BaseTOC>{TOC_ITEMS}</BaseTOC>
      <Typography variant="h2">ข้อมูลคนขับรถ</Typography>
      <DriverInfoGroup
        driver={driver}
        slotProps={{
          gallery: {
            dirPath: galleryDirPath,
            fileEntries: galleryFileEntries,
          },
        }}
      />
      <Typography variant="h2" id="operational-log">
        {TRANSLATION.operationalLogTable}
      </Typography>
      <OperationalLogTable
        logEntries={logEntries}
        slotProps={{
          form: {
            vehicleSelect: {
              options: vehicleSelectOptions,
            },
            driverSelect: {
              disabled: true,
              options: [driver],
            },
            routeSelect: {
              options: routeSelectOptions,
            },
          },
        }}
      />
      <Typography variant="h2" id="general-report">
        {TRANSLATION.driverGeneralReportTable}
      </Typography>
      <DriverReportGeneralTable
        hideDriverColumn
        entries={generalEntries}
        slotProps={{
          form: {
            driverSelect: {
              disabled: true,
              options: [driver],
            },
            topicComboBox: {
              options: topicComboBoxOptions,
            },
          },
        }}
      />
      <Typography variant="h2" id="medical-report">
        {TRANSLATION.driverMedicalReportTable}
      </Typography>
      <DriverReportMedicalTable
        hideDriverColumn
        entries={medicalEntries}
        slotProps={{
          form: {
            driverSelect: {
              options: [driver],
              disabled: true,
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
