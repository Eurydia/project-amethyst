import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriPostDriver } from "$backend/database/post";
import { filterItems } from "$core/filter";
import {
  exportWorkbook,
  importWorkbook,
} from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import {
  DriverEntry,
  DriverExportData,
  DriverFormData,
} from "$types/models/driver";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { DriverForm } from "./DriverForm";
const HEADER_DEFINITIONS: TableHeaderDefinition<DriverEntry>[] =
  [
    {
      label: "คนขับรถ",
      compare: (a, b) => a.name.localeCompare(b.name),
      render: (item) => (
        <BaseTypographyLink to={"/drivers/info/" + item.id}>
          {item.name} {item.surname}
        </BaseTypographyLink>
      ),
    },
    {
      label: "สายรถปัจจุบัน",
      compare: null,
      render: (item) =>
        item.routes.length === 0 ? (
          <Typography fontStyle="italic">ไม่มี</Typography>
        ) : (
          <Stack spacing={1}>
            {item.routes.map((route, index) => (
              <BaseTypographyLink
                key={"route" + index}
                to={"/pickup-routes/info/" + route.id}
              >
                {route.name}
              </BaseTypographyLink>
            ))}
          </Stack>
        ),
    },
    {
      label: "ทะเบียนรถปัจจุบัน",
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
  ];

const importTransformer = async (data: unknown) => {
  const entry = data as DriverExportData;

  const formData: DriverFormData = {
    name: entry.name.trim().normalize(),
    surname: entry.surname.trim().normalize(),
    contact: entry.contact.trim().normalize(),
    licenseType: entry.licenseType.trim().normalize(),
  };
  return formData;
};

const exportTransfomer = async (entry: DriverEntry) => {
  const driver = await tauriGetDriver(entry.id);
  if (driver === null) {
    return null;
  }
  const data: DriverExportData = {
    id: driver.id,
    contact: driver.contact,
    licenseType: driver.license_type,
    name: driver.name,
    surname: entry.surname,
  };

  return data;
};

type DriverTableProps = {
  driverEntries: DriverEntry[];
};
export const DriverTable: FC<DriverTableProps> = (
  props
) => {
  const { driverEntries } = props;
  const { revalidate } = useRevalidator();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEntries = filterItems(
    driverEntries,
    search,
    [
      "name",
      "surname",
      "vehicles.*.licensePlate",
      "routes.*.name",
    ]
  );

  const handleImport = (file: File) =>
    importWorkbook(file, {
      action: tauriPostDriver,
      transformer: importTransformer,
      cleanup: revalidate,
    });

  const handleExport = async () =>
    exportWorkbook(filteredEntries, {
      header: [
        "id",
        "name",
        "surname",
        "contact",
        "licenseType",
      ],
      transformer: exportTransfomer,
      workbookName: "drivers",
      worksheetName: "Drivers",
    }).then(
      () => {},
      (err) => {
        console.error(err);
      }
    );

  const databaseHasNoDrivers = driverEntries.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            value: search,
            onChange: setSearch,
            placeholder:
              "ค้นหาด้วยชื่อสกุลคนขับรถ, เลขทะเบียน, หรือสายรถ",
          },
          addButton: {
            // TODO: translate
            children: "Register driver",
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            children: "Register from file",
            onFileSelect: handleImport,
          },
          exportButton: {
            // TODO: translate
            children: "Export drivers",
            onClick: handleExport,
          },
        }}
      />

      <BaseSortableTable
        headers={HEADER_DEFINITIONS}
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        entries={filteredEntries}
        slotProps={{
          body: {
            emptyText: databaseHasNoDrivers
              ? "The database has no driver"
              : "ไม่พบคนขับรถ", // TODO: translate
          },
        }}
      />
      <DriverForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Stack>
  );
};
