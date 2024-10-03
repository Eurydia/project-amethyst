import { tauriGetVehicleReportInspection } from "$backend/database/get/vehicle-inspection-reports";
import { filterItems } from "$core/filter";
import { VEHICLE_REPORT_INSPECTION_TRANSFORMER } from "$core/transformers/vehicle-report-inspection";
import { exportWorkbook } from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportInspectionEntry } from "$types/models/vehicle-report-inspection";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { VehicleReportInspectionForm } from "./VehicleReportInspectionForm";

const DATETIME_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "เวลาและวันที่",
    compare: (a, b) =>
      dayjs(a.datetime).unix() - dayjs(b.datetime).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.datetime)
          .locale("th")
          .format("HH:mm น. DD MMMM YYYY")}
      </Typography>
    ),
  };
const VEHICLE_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "เลขทะเบียนรถ",
    compare: (a, b) =>
      a.vehicle_license_plate.localeCompare(
        b.vehicle_license_plate
      ),
    render: ({
      vehicle_id: vehicleId,
      vehicle_license_plate: vehicleLicensePlate,
    }) => (
      <BaseTypographyLink
        to={"/vehicles/info/" + vehicleId}
      >
        {vehicleLicensePlate}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "รอบการตรวจสภาพรถ",
    compare: (a, b) =>
      a.inspection_round_number - b.inspection_round_number,
    render: ({
      inspection_round_number: inspectionRoundNumber,
      id,
    }) => (
      <BaseTypographyLink
        to={"/vehicles/report/inspection/info/" + id}
      >
        {`รอบที่ ${inspectionRoundNumber}`}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: ({ topics }) =>
      topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{topics.join(", ")}</Typography>
      ),
  };

type VehicleReportInspectionTableProps = {
  hideVehicleColumn?: boolean;
  entries: VehicleReportInspectionEntry[];
  slotProps: {
    form: {
      vehicleSelect: {
        disabled?: boolean;
        options: VehicleModel[];
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const VehicleReportInspectionTable: FC<
  VehicleReportInspectionTableProps
> = (props) => {
  const { slotProps, entries, hideVehicleColumn } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEntries = filterItems(entries, search, [
    "title",
    "topics",
    "vehicleLicensePlate",
    "inspectionRoundNumber",
  ]);

  const handleExport = async () => {
    const reportReqs = filteredEntries.map((entry) =>
      tauriGetVehicleReportInspection(entry.id)
    );
    const reports = (await Promise.all(reportReqs)).filter(
      (report) => report !== null
    );
    exportWorkbook(reports, {
      header: [], // FIXME: define header order
      name: "ผลการตรวจสภาพรถรับส่ง",
      transformer:
        VEHICLE_REPORT_INSPECTION_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

  const databaseIsEmpty = entries.length === 0;
  const databaseHasNoVehicle =
    slotProps.form.vehicleSelect.options.length === 0;

  let headers = [
    DATETIME_HEADER,
    VEHICLE_HEADER,
    TITLE_HEADER,
    TOPIC_HEADER,
  ];

  if (hideVehicleColumn) {
    headers = [DATETIME_HEADER, TITLE_HEADER, TOPIC_HEADER];
  }

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            onChange: setSearch,
            value: search,
            placeholder:
              "ค้นหาด้วยเลขทะเบียน, รอบการตรวจ หรือหัวข้อที่เกี่ยวข้อง",
          },
          addButton: {
            disabled: databaseHasNoVehicle,
            children: "เพิ่ม",
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            disabled: true,
            children: "เพิ่มจากไฟล์",
            onFileSelect: () => {},
          },
          exportButton: {
            children: "ดาวน์โหลดสำเนา",
            onClick: handleExport,
          },
        }}
      />

      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        slotProps={{
          body: {
            emptyText: databaseIsEmpty
              ? "ฐานข้อมมูลว่าง"
              : "ไม่พบผลตรวจสภาพรถที่ค้นหา",
          },
        }}
      />
      {slotProps.form.vehicleSelect.options.length > 0 && (
        <VehicleReportInspectionForm
          editing={false}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          slotProps={{
            form: {
              topicComboBox: slotProps.form.topicComboBox,
              vehicleSelect: slotProps.form.vehicleSelect,
            },
          }}
        />
      )}
    </Stack>
  );
};
