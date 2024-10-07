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
          tauriGetOperationalLog(entry.id)
        )
      )
    ).filter((log) => log !== null);

    exportWorkbook(logs, {
      name: "บันทึกประวัติการเดินรถ",
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

  const disabledReasons: string[] = [];
  if (databaseHasNoDriver) {
    disabledReasons.push("ยังไม่มีคนขับรถในฐานข้อมูล");
  }
  if (databaseHasNoVehicle) {
    disabledReasons.push("ยังไม่มีรถรับส่งในฐานข้อมูล");
  }
  if (databaseHasNoRoute) {
    disabledReasons.push("ยังไม่มีสายรถในฐานข้อมูล");
  }

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          importButton: {
            hidden: true,
          },
          exportButton: {
            disabled: filteredEntries.length === 0,
            onClick: handleExport,
          },
          addButton: {
            disabledReasons,
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
        databaseIsEmpty={databaseHasNoLog}
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
