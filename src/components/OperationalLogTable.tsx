import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { OperationalLogEntry } from "$types/models/operational-log";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";

const HEADER_DEFINITIONS: TableHeaderDefinition<OperationalLogEntry>[] =
  [
    {
      label: "เริ่มมีผล",
      compare: (a, b) =>
        dayjs(a.startDate).unix() -
        dayjs(b.startDate).unix(),
      render: (item) => (
        <Typography>
          {dayjs(item.startDate)
            .locale("th")
            .format("DD MMMM YYYY")}
        </Typography>
      ),
    },
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
    },
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
    },
    {
      label: "เลขทะเบียน",
      compare: null,
      render: (item) => (
        <BaseTypographyLink
          to={"/vehicles/info/" + item.vehicleId}
        >
          {item.vehicleLicensePlate}
        </BaseTypographyLink>
      ),
    },
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
    },
  ];

type OperationalLogTableProps = {
  entries: OperationalLogEntry[];
  slotProps: {
    addButton: {
      disabled?: boolean;
      onClick: () => void;
    };
  };
};
export const OperationalLogTable: FC<
  OperationalLogTableProps
> = (props) => {
  const { slotProps, entries } = props;

  const [search, setSearch] = useState("");
  const filteredEntries = filterItems(entries, search, [
    "driverName",
    "driverSurname",
    "vehicleLicensePlate",
    "routeName",
  ]);

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          addButton: {
            disabled: slotProps.addButton.disabled,
            onClick: slotProps.addButton.onClick,
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
        headers={HEADER_DEFINITIONS}
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        slotProps={{
          body: {
            emptyText: "ไม่พบประวัติการเดินรถ",
          },
        }}
      />
    </Stack>
  );
};
