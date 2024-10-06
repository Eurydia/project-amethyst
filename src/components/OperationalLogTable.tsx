import { tauriGetOperationalLog } from "$backend/database/get/operational-logs";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
import { OPERATIONAL_LOG_MODEL_TRANSFORMER } from "$core/transformers/operational-log";
import { exportWorkbook } from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import { OperationalLogEntry } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { OperationalLogForm } from "./OperationalLogForm";
import { OperationalLogTableAlert } from "./OperationalLogTableAlert";

const STARTDATE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "เริ่มมีผล",
    compare: (a, b) =>
      dayjs(a.start_date).unix() -
      dayjs(b.start_date).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.start_date)
          .locale("th")
          .format("DD MMMM YYYY")}
      </Typography>
    ),
  };
const ENDDATE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "สิ้นสุด",
    compare: (a, b) =>
      dayjs(a.end_date).unix() - dayjs(b.end_date).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.end_date)
          .locale("th")
          .format("DD MMMM YYYY")}
      </Typography>
    ),
  };
const DRIVER_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "คนขับรถ",
    compare: (a, b) =>
      compareStrings(a.driver_name, b.driver_name),
    render: (item) => (
      <BaseTypographyLink
        to={"/drivers/info/" + item.driver_id}
      >
        {item.driver_name} {item.driver_surname}
      </BaseTypographyLink>
    ),
  };
const VEHICLE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
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
  };
const ROUTE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
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
  };

type OperationalLogTableProps = {
  hideVehicleColumn?: boolean;
  hideRouteColumn?: boolean;
  hideDriverColumn?: boolean;
  logEntries: OperationalLogEntry[];
  slotProps: {
    form: {
      vehicleSelect: {
        disabled?: boolean;
        options: VehicleModel[];
      };
      driverSelect: {
        disabled?: boolean;
        options: DriverModel[];
      };
      routeSelect: {
        disabled?: boolean;
        options: PickupRouteModel[];
      };
    };
  };
};
export const OperationalLogTable: FC<
  OperationalLogTableProps
> = (props) => {
  const {
    logEntries: entries,
    slotProps,
    hideDriverColumn,
    hideRouteColumn,
    hideVehicleColumn,
  } = props;

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredEntries = filterObjects(entries, search, [
    "driverName",
    "driverSurname",
    "vehicleLicensePlate",
    "routeName",
  ]);

  const handleExport = async () => {
    if (filteredEntries.length === 0) {
      return;
    }
    const logs = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetOperationalLog(entry.id)
        )
      )
    ).filter((log) => log !== null);

    exportWorkbook(logs, {
      name: "ประวัติการเดินรถ",
      transformer:
        OPERATIONAL_LOG_MODEL_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดา่วโหลดล้มเหลว")
    );
  };

  const headers = [
    STARTDATE_HEADER_DEFINITION,
    ENDDATE_HEADER_DEFINITION,
  ];
  if (!hideDriverColumn) {
    headers.push(DRIVER_HEADER_DEFINITION);
  }
  if (!hideVehicleColumn) {
    headers.push(VEHICLE_HEADER_DEFINITION);
  }
  if (!hideRouteColumn) {
    headers.push(ROUTE_HEADER_DEFINITION);
  }

  const databaseHasNoDriver =
    slotProps.form.driverSelect.options.length === 0;
  const databaseHasNoVehicle =
    slotProps.form.vehicleSelect.options.length === 0;
  const databaseHasNoRoute =
    slotProps.form.routeSelect.options.length === 0;

  const databaseHasNoLog = entries.length === 0;
  const preventAddLog =
    databaseHasNoDriver ||
    databaseHasNoVehicle ||
    databaseHasNoRoute;

  return (
    <Stack spacing={1}>
      <OperationalLogTableAlert
        show={preventAddLog}
        databaseHasNoDriver={databaseHasNoDriver}
        databaseHasNoVehicle={databaseHasNoVehicle}
        databaseHasNoRoute={databaseHasNoRoute}
      />
      <BaseSortableTableToolbar
        slotProps={{
          importButton: {
            disabled: true,
            onFileSelect: () => {
              throw new Error("Function not implemented.");
            },
          },
          exportButton: {
            disabled: databaseHasNoLog,
            onClick: handleExport,
          },
          addButton: {
            disabled: preventAddLog,
            onClick: () => setDialogOpen(true),
          },
          searchField: {
            placeholder:
              "ค้นหาด้วยชื่อสกุลคนขับรถ, เลขทะเบียน, หรือสายรถ",
            value: search,
            onChange: setSearch,
          },
        }}
      />
      <BaseSortableTable
        entries={filteredEntries}
        headers={headers}
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        slotProps={{
          body: {
            emptyText: databaseHasNoLog
              ? "ฐานข้อมูลว่าง"
              : "ไม่พบประวัติการเดินรถที่ค้นหา",
          },
        }}
      />
      {!databaseHasNoDriver &&
        !databaseHasNoVehicle &&
        !databaseHasNoRoute && (
          <OperationalLogForm
            open={dialogOpen}
            slotProps={slotProps.form}
            onClose={() => setDialogOpen(false)}
          />
        )}
    </Stack>
  );
};
