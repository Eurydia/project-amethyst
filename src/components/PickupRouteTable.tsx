/** @format */

import { filterItems } from "$core/filter";
import { useExportPickupRoute } from "$hooks/useExportPickupRoute";
import { useImportPickupRoute } from "$hooks/useImportPickupRoute";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { PickupRouteForm } from "./PickupRouteForm";

const HEADER_DEFINITION: TableHeaderDefinition<PickupRouteEntry>[] = [
  {
    label: "สายรถ",
    compare: (a, b) => a.name.localeCompare(b.name),
    render: (item) => (
      <BaseTypographyLink to={"/pickup-routes/info/" + item.id}>
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
export const PickupRouteTable: FC<PickupRouteTableProps> = (props) => {
  const { routeEntries } = props;

  const importRoute = useImportPickupRoute();
  const exportRoute = useExportPickupRoute();

  const { revalidate } = useRevalidator();

  const [search, setSearch] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const filteredEntries = filterItems(routeEntries, search, [
    "name",
    "vehicles.*.licensePlate",
    "drivers.*.name",
    "drivers.*.surname",
  ]);

  const databaseHasNoRoute = routeEntries.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder: "ค้นหาด้วยสายรถ, เลขทะเบียน, หรือชื่อสกุลคนขับรถ",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            children: "register route", // TODO: translate
            onClick: () => setFormDialogOpen(true),
          },
          importButton: {
            children: "register from file", // TODO: translate
            onFileSelect: (file) => importRoute(file).finally(revalidate),
          },
          exportButton: {
            children: "export routes", // TODO: translate
            onClick: () => exportRoute(filteredEntries),
          },
        }}
      />
      <BaseSortableTable
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        headers={HEADER_DEFINITION}
        entries={routeEntries}
        slotProps={{
          body: {
            emptyText: databaseHasNoRoute
              ? "No routes registered in the system"
              : "No matching routes",
          },
        }}
      />
      <PickupRouteForm
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
      />
    </Stack>
  );
};
