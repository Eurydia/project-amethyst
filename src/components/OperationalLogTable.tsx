import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import { OperationalLogEntry } from "$types/models/operational-log";
import { PickupRouteModel } from "$types/models/pickup-route";
import { VehicleModel } from "$types/models/vehicle";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { OperationalLogForm } from "./OperationalLogForm";

const STARTDATE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "เริ่มมีผล",
    compare: (a, b) =>
      dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.startDate)
          .locale("th")
          .format("DD MMMM YYYY")}
      </Typography>
    ),
  };
const ENDDATE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "สิ้นสุด",
    compare: (a, b) =>
      dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.endDate)
          .locale("th")
          .format("DD MMMM YYYY")}
      </Typography>
    ),
  };
const DRIVER_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "คนขับรถ",
    compare: (a, b) =>
      a.driverName.localeCompare(b.driverName),
    render: (item) => (
      <BaseTypographyLink
        to={"/drivers/info/" + item.driverId}
      >
        {item.driverName} {item.driverSurname}
      </BaseTypographyLink>
    ),
  };
const VEHICLE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "เลขทะเบียน",
    compare: (a, b) =>
      a.vehicleLicensePlate.localeCompare(
        b.vehicleLicensePlate,
      ),
    render: (item) => (
      <BaseTypographyLink
        to={"/vehicles/info/" + item.vehicleId}
      >
        {item.vehicleLicensePlate}
      </BaseTypographyLink>
    ),
  };
const ROUTE_HEADER_DEFINITION: TableHeaderDefinition<OperationalLogEntry> =
  {
    label: "สายรถ",
    compare: (a, b) =>
      a.routeName.localeCompare(b.routeName),
    render: (item) => (
      <BaseTypographyLink
        to={"/pickup-routes/info/" + item.routeId}
      >
        {item.routeName}
      </BaseTypographyLink>
    ),
  };

type OperationalLogTableProps = {
  hideVehicleColumn?: boolean;
  hideRouteColumn?: boolean;
  hideDriverColumn?: boolean;
  entries: OperationalLogEntry[];
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
    entries,
    slotProps,
    hideDriverColumn,
    hideRouteColumn,
    hideVehicleColumn,
  } = props;

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredEntries = filterItems(entries, search, [
    "driverName",
    "driverSurname",
    "vehicleLicensePlate",
    "routeName",
  ]);

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

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          importButton: {},
          exportButton: {},
          addButton: {
            disabled:
              databaseHasNoDriver ||
              databaseHasNoVehicle ||
              databaseHasNoRoute,
            onClick: () => setDialogOpen(true),
            label: "เพิ่มประวัติการเดินรถ",
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
            emptyText: "ไม่พบประวัติการเดินรถ",
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
