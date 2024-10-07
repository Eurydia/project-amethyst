import { tauriGetAttendanceLog } from "$backend/database/get/attendance-logs";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
import { ATTENDANCE_LOG_MODEL_TRANSFORMER } from "$core/transformers/attendance-log";
import { exportWorkbook } from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { AttendanceLogEntry } from "$types/models/attendance-log";
import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { AttendanceLogTableCheckBox } from "./AttendanceLogTableCheckBox";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";

const HEADER_DEFINITIONS: TableHeaderDefinition<AttendanceLogEntry>[] =
  [
    {
      label: "สายรถ",
      compare: (a, b) =>
        compareStrings(a.route_name, b.route_name),
      render: (item) => (
        <BaseTypographyLink
          to={"/pickup-routes/info/" + item.route_id}
        >
          {item.route_name}
        </BaseTypographyLink>
      ),
    },
    {
      label: "เลขทะเบียน",
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
    },
    {
      label: "คนขับรถ",
      compare: (a, b) =>
        compareStrings(
          `${a.driver_name} ${a.driver_surname}`,
          `${b.driver_name} ${b.driver_surname}`
        ),
      render: (item) => (
        <BaseTypographyLink
          to={"/drivers/info/" + item.driver_id}
        >
          {item.driver_name} {item.driver_surname}
        </BaseTypographyLink>
      ),
    },
    {
      label: "เวลารับข้า",
      compare: null,
      render: (item) => (
        <AttendanceLogTableCheckBox
          log={item}
          mode="arrival"
        />
      ),
    },
    {
      label: "เวลารับออก",
      compare: null,
      render: (item) => (
        <AttendanceLogTableCheckBox
          log={item}
          mode="departure"
        />
      ),
    },
  ];

type AttendanceLogTableProps = {
  entries: AttendanceLogEntry[];
};
export const AttendanceLogTable: FC<
  AttendanceLogTableProps
> = (props) => {
  const { entries } = props;
  const [search, setSearch] = useState("");

  const filteredEntries = filterObjects(entries, search, [
    (item) => item.driver_name,
    (item) => item.driver_surname,
    (item) => item.vehicle_license_plate,
    (item) => item.route_name,
  ]);

  const handleExport = async () => {
    if (filteredEntries.length === 0) {
      return;
    }
    const logs = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetAttendanceLog(entry.id)
        )
      )
    ).filter((log) => log !== null);

    exportWorkbook(logs, {
      name: "บันทึกประวัติการเดินรถ",
      transformer:
        ATTENDANCE_LOG_MODEL_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

  const databaseHasNoLog = entries.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            onChange: setSearch,
            value: search,
            placeholder:
              "ค้นหาด้วยชื่อสกุลคนขับรถ, สายรถ, หรือเลขทะเบียน",
          },
          addButton: {
            hidden: true,
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
        databaseIsEmpty={databaseHasNoLog}
        headers={HEADER_DEFINITIONS}
        defaultSortByColumn={0}
        defaultSortOrder="asc"
        entries={filteredEntries}
      />
    </Stack>
  );
};
