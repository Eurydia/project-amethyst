/** @format */

import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriPostPickupRoute } from "$backend/database/post";
import { filterItems } from "$core/filter";
import {
  exportWorkbook,
  importWorkbook,
} from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import {
  PickupRouteEntry,
  PickupRouteExportData,
  PickupRouteFormData,
} from "$types/models/pickup-route";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { PickupRouteForm } from "./PickupRouteForm";

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

const importTransformer = (data: unknown) => {
  const entry = data as PickupRouteExportData;
  const name = entry["ชื่อสาย"].trim().normalize();
  const arrivalTime = dayjs(entry["เวลารับเข้า"], "HH:mm");
  const departureTime = dayjs(entry["เวลารับออก"], "HH:mm");
  if (!arrivalTime.isValid() || !departureTime.isValid()) {
    return null;
  }
  const formData: PickupRouteFormData = {
    name,
    arrivalTime: arrivalTime.format("HH:mm"),
    departureTime: departureTime.format("HH:mm"),
  };
  return formData;
};

const exportTransformer = async (
  entry: PickupRouteEntry
) => {
  const route = await tauriGetPickupRoute(entry.id);
  if (route === null) {
    return null;
  }
  const exportData: PickupRouteExportData = {
    ชื่อสาย: route.name,
    เวลารับเข้า: route.arrival_time,
    เวลารับออก: route.departure_time,
    เลขรหัส: route.id,
  };
  return exportData;
};

type PickupRouteTableProps = {
  routeEntries: PickupRouteEntry[];
};
export const PickupRouteTable: FC<PickupRouteTableProps> = (
  props
) => {
  const { routeEntries } = props;

  const { revalidate } = useRevalidator();

  const [search, setSearch] = useState("");
  const [formDialogOpen, setFormDialogOpen] =
    useState(false);
  const filteredEntries = filterItems(
    routeEntries,
    search,
    [
      "name",
      "vehicles.*.licensePlate",
      "drivers.*.name",
      "drivers.*.surname",
    ]
  );

  const handleImport = (file: File) =>
    importWorkbook(file, {
      action: tauriPostPickupRoute,
      cleanup: revalidate,
      transformer: importTransformer,
    });

  const handleExport = () =>
    exportWorkbook(filteredEntries, {
      header: [
        "เลขรหัส",
        "ชื่อสาย",
        "เวลารับเข้า",
        "เวลารับออก",
      ],
      transformer: exportTransformer,
      workbookName: "Routes", // TODO: translate
      worksheetName: "Routes", // TODO: translate
    });

  const databaseHasNoRoute = routeEntries.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder:
              "ค้นหาด้วยสายรถ, เลขทะเบียน, หรือชื่อสกุลคนขับรถ",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            children: "register route", // TODO: translate
            onClick: () => setFormDialogOpen(true),
          },
          importButton: {
            children: "register from file", // TODO: translate
            onFileSelect: handleImport,
          },
          exportButton: {
            children: "export routes", // TODO: translate
            onClick: handleExport,
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
              : "No matching routes", //  TODO: translate
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
