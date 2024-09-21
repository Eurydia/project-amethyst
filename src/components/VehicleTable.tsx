import { postVehicle } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import {
  VehicleEntry,
  VehicleFormData,
} from "$types/models/vehicle";
import { AddRounded } from "@mui/icons-material";
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
        a.licensePlate.localeCompare(b.licensePlate),
      render: ({ id, licensePlate }) => (
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
      render: ({ drivers }) =>
        drivers.length === 0 ? (
          <Typography fontStyle="italic">ไม่มี</Typography>
        ) : (
          <Stack spacing={1}>
            {drivers.map(({ id, name, surname }, index) => (
              <BaseTypographyLink
                key={"driver" + index}
                to={"/drivers/info/" + id}
              >
                {name} {surname}
              </BaseTypographyLink>
            ))}
          </Stack>
        ),
    },
  ];

type VehicleTableProps = {
  vehicleEntries: VehicleEntry[];
  slotProps: {
    form: {
      vendorComboBox: {
        options: string[];
      };
    };
  };
};
export const VehicleTable: FC<VehicleTableProps> = (
  props,
) => {
  const { vehicleEntries, slotProps } = props;
  const { revalidate } = useRevalidator();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEntries = filterItems(
    vehicleEntries,
    search,
    [
      "licensePlate",
      "routes.*.name",
      "drivers.*.name",
      "drivers.*.surname",
    ],
  );
  const databaseHasNoVehicle = vehicleEntries.length === 0;
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
            // TODO: translate
            children: "Register Vehicle",
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            children: "Register from file",
            onClick: () => {},
          },
          exportButton: {
            children: "export vehicles",
            onClick: () => {},
          },
        }}
      />
      <BaseSortableTable
        headers={HEADER_DEFINITION}
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        entries={filteredEntries}
        slotProps={{
          body: {
            // TODO: translate
            emptyText: databaseHasNoVehicle
              ? "Database has no vehicle"
              : "ไม่พบรถรับส่ง",
          },
        }}
      />
      <VehicleForm
        initFormData={{
          licensePlate: "",
          registeredCity: "",
          vehicleClass: "",
          vendor: "",
        }}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="ลงทะเบียนรถรับส่ง"
        slotProps={{
          vendorComboBox: slotProps.form.vendorComboBox,
          submitButton: {
            label: "เพิ่มรถรับส่ง",
            startIcon: <AddRounded />,
            onClick: (formData: VehicleFormData) =>
              postVehicle(formData)
                .then(
                  () => {
                    toast.success("ลงทะเบียนสำเร็จ");
                    revalidate();
                  },
                  () => toast.error("ลงทะเบียนล้มเหลว"),
                )
                .finally(() => setDialogOpen(false)),
          },
        }}
      />
    </Stack>
  );
};
