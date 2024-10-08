import { tauriGetVehicle } from "$backend/database/get/vehicles";
import { tauriPostVehicle } from "$backend/database/post";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
import { VEHICLE_MODEL_TRANSFORMER } from "$core/transformers/vehicle";
import { VEHICLE_VALIDATOR } from "$core/validators/vehicle";
import {
  exportWorkbook,
  importWorkbook,
} from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleEntry } from "$types/models/vehicle";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { VehicleForm } from "./VehicleForm";

const HEADER_DEFINITION: TableHeaderDefinition<VehicleEntry>[] =
  [
    {
      label: "ทะเบียนรถ",
      compare: (a, b) =>
        compareStrings(a.license_plate, b.license_plate),
      render: ({ id, license_plate: licensePlate }) => (
        <BaseTypographyLink to={"/vehicles/info/" + id}>
          {licensePlate}
        </BaseTypographyLink>
      ),
    },
    {
      label: "สายรถ",
      compare: null,
      render: (item) =>
        item.routes.length === 0 ? (
          <Typography fontStyle="italic">ไม่มี</Typography>
        ) : (
          <Stack spacing={1}>
            {item.routes.map(({ id, name }, index) => (
              <BaseTypographyLink
                key={"route" + index}
                to={"/pickup-routes/info/" + id}
              >
                {name}
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

type VehicleTableProps = {
  entries: VehicleEntry[];
  slotProps: {
    form: {
      vendorComboBox: {
        options: string[];
      };
    };
  };
};
export const VehicleTable: FC<VehicleTableProps> = (
  props
) => {
  const { entries, slotProps } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEntries = filterObjects(entries, search, [
    (item) => item.license_plate,
    (item) => item.routes.map((route) => route.name),
    (item) => item.drivers.map((driver) => driver.name),
    (item) => item.drivers.map((driver) => driver.surname),
  ]);

  const { revalidate } = useRevalidator();

  const handleImport = (file: File) => {
    importWorkbook(file, {
      action: tauriPostVehicle,
      validator: VEHICLE_VALIDATOR.validate,
    }).then(
      () => {
        toast.success("เพิ่มสำเร็จ");
        revalidate();
      },
      () => toast.error("เพิ่มล้มเหลว")
    );
  };

  const handleExport = async () => {
    const vehicles = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetVehicle(entry.id)
        )
      )
    ).filter((vehicle) => vehicle !== null);

    exportWorkbook(vehicles, {
      name: "ทะเบียนรถรับส่ง",
      transformer: async (dt) =>
        VEHICLE_MODEL_TRANSFORMER.toExportData(dt),
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

  const databaseHasNoVehicle = entries.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder:
              "ค้นหาด้วยเลขทะเบียน, สายรถ, หรือชื่อสกุลคนขับรถ",
            onChange: setSearch,
            value: search,
          },
          addButton: {
            disabledReasons: [],
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
        headers={HEADER_DEFINITION}
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        entries={filteredEntries}
        databaseIsEmpty={databaseHasNoVehicle}
      />
      <VehicleForm
        editing={false}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          vendorComboBox: slotProps.form.vendorComboBox,
        }}
      />
    </Stack>
  );
};
