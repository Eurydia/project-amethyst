import { tauriGetDriver } from "$backend/database/get/drivers";
import { tauriPostDriver } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { DRIVER_MODEL_TRANSFORMER } from "$core/transformers/driver";
import { DRIVER_MODEL_VALIDATOR } from "$core/validators/driver";
import {
  exportWorkbook,
  importWorkbook,
} from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { DriverEntry } from "$types/models/driver";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
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
          {`${item.name} ${item.surname}`
            .trim()
            .normalize()}
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

  const handleImport = (file: File) => {
    importWorkbook(file, {
      action: tauriPostDriver,
      validator: async (dt) =>
        DRIVER_MODEL_VALIDATOR.validate(dt),
    }).then(
      () => {
        toast.success(`เพิ่มคนขับรถสำเร็จ`);
        revalidate();
      },
      () => toast.error("เพิ่มคนขับรถล้มเหลว")
    );
  };
  const handleExport = async () => {
    const drivers = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetDriver(entry.id)
        )
      )
    ).filter((driver) => driver !== null);

    exportWorkbook(drivers, {
      transformer: DRIVER_MODEL_TRANSFORMER.toExportData,
      name: "รายชื่อคนขับรถ",
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

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
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            onFileSelect: handleImport,
          },
          exportButton: {
            disabled: filteredEntries.length === 0,
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
              ? "ฐานข้อมูลคนขับรถว่าง"
              : "ไม่พบคนขับรถที่ค้นหา",
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
