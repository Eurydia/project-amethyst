import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { SearchRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseTypographyLink } from "./BaseTypographyLink";

const HEADER_DEFINITION: TableHeaderDefinition<PickupRouteEntry>[] =
  [
    {
      label: "สายรถ",
      compare: (a, b) => a.name.localeCompare(b.name),
      render: (item) => (
        <BaseTypographyLink
          to={"/pickup-routes/info/" + item.id}
        >
          {item.name}
        </BaseTypographyLink>
      ),
    },
    {
      label: "ทะเบียนรถ",
      compare: null,
      render: (item) =>
        item.vehicles.length === 0 ? (
          <Typography fontStyle="italic">ไม่มี</Typography>
        ) : (
          <Stack spacing={1}>
            {item.vehicles.map((vehicle, index) => (
              <BaseTypographyLink
                key={"vehicle" + index}
                to={"/vehicles/info/" + vehicle.id}
              >
                {vehicle.licensePlate}
              </BaseTypographyLink>
            ))}
          </Stack>
        ),
    },
    {
      label: "คนขับรถ",
      compare: null,
      render: (item) =>
        item.drivers.length === 0 ? (
          <Typography fontStyle="italic">ไม่มี</Typography>
        ) : (
          <Stack spacing={1}>
            {item.drivers.map((driver, index) => (
              <BaseTypographyLink
                key={"driver" + index}
                to={"/drivers/info/" + driver.id}
              >
                {driver.name} {driver.surname}
              </BaseTypographyLink>
            ))}
          </Stack>
        ),
    },
  ];

type PickupRouteTableProps = {
  routeEntries: PickupRouteEntry[];
};
export const PickupRouteTable: FC<PickupRouteTableProps> = (
  props,
) => {
  const { routeEntries } = props;
  const [search, setSearch] = useState("");

  const filteredEntries = filterItems(
    routeEntries,
    search,
    [
      "name",
      "vehicles.*.licensePlate",
      "drivers.*.name",
      "drivers.*.surname",
    ],
  );

  return (
    <Stack spacing={1}>
      <BaseInputTextField
        onChange={setSearch}
        value={search}
        placeholder="ค้นหาด้วยสายรถ, เลขทะเบียน, หรือชื่อสกุลคนขับรถ"
        startIcon={<SearchRounded />}
      />
      <BaseSortableTable
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        headers={HEADER_DEFINITION}
        entries={filteredEntries}
        slotProps={{
          body: {
            emptyText: "ไม่พบสายรถ",
          },
        }}
      />
    </Stack>
  );
};
