import { BaseTOC } from "$components/BaseTOC";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { OperationalLogTable } from "$components/OperationalLogTable";
import { VehicleInfoGroup } from "$components/VehicleInfoGroup";
import { VehicleReportGeneralTable } from "$components/VehicleReportGeneralTable";
import { VehicleReportInspectionTable } from "$components/VehicleReportInspectionTable";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { VehicleInfoPageLoaderData } from "./loader";

const TOC_ITEMS: {
  label: string;
  href: string;
}[] = [
  { label: "ข้อมูลรถรับส่ง", href: "#info" },
  {
    label: "ตารางบันทึกประวัติการเดินรถ",
    href: "#operational-log",
  },
  {
    label: "ตารางบันทึกเรื่องร้องเรียนรถรับส่ง",
    href: "#general-report",
  },
  {
    label: "ตารางบันทึกผลการตรวจสภาพรถ",
    href: "#inspection-report",
  },
];

export const VehicleInfoPage: FC = () => {
  const {
    vehicle,

    galleryDirPath,
    galleryFileEntries,

    logEntries,
    generalEntries,
    inspectionEntries,

    driverSelectOptions,
    routeSelectOptions,
    topicComboBoxOptions,
    vendorComboBoxOptions,
  } = useLoaderData() as VehicleInfoPageLoaderData;

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/vehicles">
        <KeyboardArrowLeftRounded />
        ทะเบียนรถรับส่ง
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
        {vehicle.license_plate}
      </Typography>
      <BaseTOC>{TOC_ITEMS}</BaseTOC>
      <Typography
        variant="h2"
        id="info"
      >
        ข้อมูลรถรับส่ง
      </Typography>
      <VehicleInfoGroup
        vehicle={vehicle}
        slotProps={{
          form: {
            vendorComboBox: {
              options: vendorComboBoxOptions,
            },
          },
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
        entries={logEntries}
        hideVehicleColumn
        slotProps={{
          form: {
            vehicleSelect: {
              disabled: true,
              options: [vehicle],
            },
            driverSelect: {
              options: driverSelectOptions,
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
        ตารางบันทึกเรื่องร้องเรียนรถรับส่ง
      </Typography>
      <VehicleReportGeneralTable
        entries={generalEntries}
        hideVehicleColumn
        slotProps={{
          form: {
            vehicleSelect: {
              disabled: true,
              options: [vehicle],
            },
            topicComboBox: {
              options: topicComboBoxOptions,
            },
          },
        }}
      />
      <Typography
        variant="h2"
        id="inspection-report"
      >
        ตารางบันทึกผลการตรวจสภาพรถ
      </Typography>
      <VehicleReportInspectionTable
        entries={inspectionEntries}
        hideVehicleColumn
        slotProps={{
          form: {
            vehicleSelect: {
              disabled: true,
              options: [vehicle],
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
