import { BaseTOC } from "$components/BaseTOC";
import { DriverInfoGroup } from "$components/DriverInfoGroup";
import { DriverReportGeneralTable } from "$components/DriverReportGeneralTable";
import { DriverReportMedicalTable } from "$components/DriverReportMedicalTable";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { IndexPageLoaderData as DriverInfoPageLoaderData } from "./loader";

const TOC_ITEMS = [
  {
    label: "ข้อมูลคนขับรถ",
    href: "#info",
  },
  {
    label: "ตารางบันทึกประวัติการเดินรถ",
    href: "#operational-log",
  },
  {
    label: "ตารางบันทึกเรื่องร้องเรียน",
    href: "#general-report",
  },
  {
    label: "ตารางบันทึกผลการตรวจสารเสพติด",
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
      <Typography variant="h1">
        {driver.name} {driver.surname}
      </Typography>
      <BaseTOC>{TOC_ITEMS}</BaseTOC>
      <Typography
        variant="h2"
        id="info"
      >
        ข้อมูลคนขับรถ
      </Typography>
      <DriverInfoGroup
        driver={driver}
        slotProps={{
          gallery: {
            dirPath: galleryDirPath,
            fileEntries: galleryFileEntries,
          },
        }}
      />
      <Typography
        variant="h2"
        id="operational-log"
      >
        ตารางบันทึกประวัติการเดินรถ
      </Typography>
      <OperationalLogTable
        hideDriverColumn
        entries={logEntries}
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
      <Typography
        variant="h2"
        id="general-report"
      >
        ตารางบันทึกเรื่องร้องเรียน
      </Typography>
      <DriverReportGeneralTable
        hideDriverColumn
        entries={generalEntries}
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
      <Typography
        variant="h2"
        id="medical-report"
      >
        ตารางบันทึกผลการตรวจสารเสพติด
      </Typography>
      <DriverReportMedicalTable
        hideDriverColumn
        entries={medicalEntries}
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
    </Stack>
  );
};
