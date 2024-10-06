import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriPostPickupRoute } from "$backend/database/post";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route";
import { PICKUP_ROUTE_VALIDATOR } from "$core/validators/pickup-route";
import {
  exportWorkbook,
  importWorkbook,
} from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { PickupRouteForm } from "./PickupRouteForm";

const HEADER_DEFINITION: TableHeaderDefinition<PickupRouteEntry>[] =
  [
    {
      label: "สายรถ",
      compare: (a, b) => compareStrings(a.name, b.name),
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
  props
) => {
  const { routeEntries } = props;

  const { revalidate } = useRevalidator();

  const [search, setSearch] = useState("");
  const [formDialogOpen, setFormDialogOpen] =
    useState(false);
  const filteredEntries = filterObjects(
    routeEntries,
    search,
    ["name", "vehicles", "drivers"]
  );

  const handleImport = (file: File) => {
    importWorkbook(file, {
      validator: PICKUP_ROUTE_VALIDATOR.validate,
      action: tauriPostPickupRoute,
    }).then(
      () => {
        toast.success("เพิ่มสำเร็จ");
        revalidate();
      },
      () => toast.error("เพิ่มล้มเหลว")
    );
  };

  const handleExport = async () => {
    const routes = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetPickupRoute(entry.id)
        )
      )
    ).filter((route) => route !== null);

    exportWorkbook(routes, {
      name: "รายชื่อสายรถ",
      transformer: async (dt) =>
        PICKUP_ROUTE_MODEL_TRANSFORMER.toExportData(dt),
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

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
            onClick: () => setFormDialogOpen(true),
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
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        headers={HEADER_DEFINITION}
        entries={routeEntries}
        slotProps={{
          body: {
            emptyText: databaseHasNoRoute
              ? "ฐานข้อมูลว่าง"
              : "ไม่พบสายรถที่ค้นหา",
          },
        }}
      />
      <PickupRouteForm
        editing={false}
        open={formDialogOpen}
        onClose={() => setFormDialogOpen(false)}
      />
    </Stack>
  );
};
