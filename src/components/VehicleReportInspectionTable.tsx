import { tauriGetVehicleReportInspection } from "$backend/database/get/vehicle-inspection-reports";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
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
      compareStrings(
        a.vehicle_license_plate,
        b.vehicle_license_plate
      ),
    render: (item) => (
      <BaseTypographyLink
        to={"/vehicles/info/" + item.vehicle_id}
      >
        {item.vehicle_license_plate}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "ชื่อเรื่อง",
    compare: (a, b) => compareStrings(a.title, b.title),
    render: (item) => (
      <BaseTypographyLink
        to={"/vehicles/report/inspection/info/" + item.id}
      >
        {item.title}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER: TableHeaderDefinition<VehicleReportInspectionEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: (item) => {
      const topics = item.topics
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0);

      return topics.length > 0 ? (
        <Typography>{topics.join(", ")}</Typography>
      ) : (
        <Typography fontStyle="italic">ไม่มี</Typography>
      );
    },
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

  const filteredEntries = filterObjects(entries, search, [
    (item) => item.title,
    (item) => item.topics,
    (item) => item.vehicle_license_plate,
  ]);

  const handleExport = async () => {
    const reports = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetVehicleReportInspection(entry.id)
        )
      )
    ).filter((report) => report !== null);

    exportWorkbook(reports, {
      name: "บันทึกผลการตรวจสภาพรถรับส่ง",
      transformer:
        VEHICLE_REPORT_INSPECTION_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

  const databaseHasNoReport = entries.length === 0;
  const databaseHasNoVehicle =
    slotProps.form.vehicleSelect.options.length === 0;

  const headers = hideVehicleColumn
    ? [DATETIME_HEADER, TITLE_HEADER, TOPIC_HEADER]
    : [
        DATETIME_HEADER,
        VEHICLE_HEADER,
        TITLE_HEADER,
        TOPIC_HEADER,
      ];

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            onChange: setSearch,
            value: search,
            placeholder:
              "ค้นหาด้วยเลขทะเบียน, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
          },
          addButton: {
            disabled: databaseHasNoVehicle,
            disabledReasons: [
              "ยังไม่มีรถรับส่งในฐานข้อมูล",
            ],
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            hidden: true,
          },
          exportButton: {
            disabled: filteredEntries.length === 0,
            onClick: handleExport,
          },
        }}
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        databaseIsEmpty={databaseHasNoReport}
      />
      {!databaseHasNoVehicle && (
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
