import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import { OperationalLogEntry } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import { Alert, Collapse, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { OperationalLogForm } from "./OperationalLogForm";

const STARTDATE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "เริ่มมีผล",
    compare: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.startDate).locale("th").format("DD MMMM YYYY")}
      </Typography>
    ),
  };
const ENDDATE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> = {
  label: "สิ้นสุด",
  compare: (a, b) => dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
  render: (item) => (
    <Typography>
      {dayjs(item.endDate).locale("th").format("DD MMMM YYYY")}
    </Typography>
  ),
};
const DRIVER_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> = {
  label: "คนขับรถ",
  compare: (a, b) => a.driverName.localeCompare(b.driverName),
  render: (item) => (
    <BaseTypographyLink to={"/drivers/info/" + item.driverId}>
      {item.driverName} {item.driverSurname}
    </BaseTypographyLink>
  ),
};
const VEHICLE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> = {
  label: "เลขทะเบียน",
  compare: (a, b) => a.vehicleLicensePlate.localeCompare(b.vehicleLicensePlate),
  render: (item) => (
    <BaseTypographyLink to={"/vehicles/info/" + item.vehicleId}>
      {item.vehicleLicensePlate}
    </BaseTypographyLink>
  ),
};
const ROUTE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> = {
  label: "สายรถ",
  compare: (a, b) => a.routeName.localeCompare(b.routeName),
  render: (item) => (
    <BaseTypographyLink to={"/pickup-routes/info/" + item.routeId}>
      {item.routeName}
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
export const OperationalLogTable: FC<OperationalLogTableProps> = (props) => {
  const {
    logEntries,
    slotProps,
    hideDriverColumn,
    hideRouteColumn,
    hideVehicleColumn,
  } = props;

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredEntries = filterItems(logEntries, search, [
    "driverName",
    "driverSurname",
    "vehicleLicensePlate",
    "routeName",
  ]);

  const headers = [STARTDATE_HEADER_DEFINITION, ENDDATE_HEADER_DEFINITION];
  if (!hideDriverColumn) {
    headers.push(DRIVER_HEADER_DEFINITION);
  }
  if (!hideVehicleColumn) {
    headers.push(VEHICLE_HEADER_DEFINITION);
  }
  if (!hideRouteColumn) {
    headers.push(ROUTE_HEADER_DEFINITION);
  }

  const databaseHasNoDriver = slotProps.form.driverSelect.options.length === 0;
  const databaseHasNoVehicle =
    slotProps.form.vehicleSelect.options.length === 0;
  const databaseHasNoRoute = slotProps.form.routeSelect.options.length === 0;

  const databaseHasNoLog = logEntries.length === 0;
  const preventAddLog =
    databaseHasNoDriver || databaseHasNoVehicle || databaseHasNoRoute;

  return (
    <Stack spacing={1}>
      <Collapse in={preventAddLog}>
        {/* TODO: Translate */}
        <Alert variant="outlined" severity="warning">
          <Typography>ไม่สามารถเพิ่มประวัติการเดินรถได้ เพราะว่า</Typography>
          <ul>
            {databaseHasNoDriver && (
              <li>
                <Typography>No driver present in database</Typography>
              </li>
            )}
            {databaseHasNoVehicle && (
              <li>
                <Typography>ไม่มีรถ</Typography>
              </li>
            )}
            {databaseHasNoRoute && (
              <li>
                <Typography>ไม่มีสายรถ</Typography>
              </li>
            )}
          </ul>
        </Alert>
      </Collapse>
      <BaseSortableTableToolbar
        slotProps={{
          // TODO: translate
          importButton: {
            disabled: preventAddLog,
            children: "Add log from file",
            onFileSelect: function (): void {
              throw new Error("Function not implemented.");
            },
          },
          exportButton: {
            children: "Export logs",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
          },
          addButton: {
            disabled: preventAddLog,
            children: "เพิ่มประวัติการเดินรถ",
            onClick: () => setDialogOpen(true),
          },
          searchField: {
            placeholder: "ค้นหาด้วยชื่อสกุลคนขับรถ, เลขทะเบียน, หรือสายรถ",
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
          // TODO: translate
          body: {
            emptyText: databaseHasNoLog
              ? "Database is empty"
              : "ไม่พบประวัติการเดินรถ",
          },
        }}
      />
      {!databaseHasNoDriver && !databaseHasNoVehicle && !databaseHasNoRoute && (
        <OperationalLogForm
          open={dialogOpen}
          slotProps={slotProps.form}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </Stack>
  );
};
