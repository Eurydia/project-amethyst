import { postDriver } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import {
  DriverEntry,
  DriverFormData,
} from "$types/models/driver";
import {
  AddRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseSortableTable } from "./BaseSortableTable";
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

type DriverTableProps = {
  driverEntries: DriverEntry[];
};
export const DriverTable: FC<DriverTableProps> = (
  props,
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
    ],
  );

  return (
    <Stack spacing={1}>
      <BaseInputTextField
        startIcon={<SearchRounded />}
        value={search}
        onChange={setSearch}
        placeholder="ค้นหาด้วยชื่อสกุลคนขับรถ, เลขทะเบียน, หรือสายรถ"
      />
      <BaseSortableTable
        headers={HEADER_DEFINITIONS}
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        entries={filteredEntries}
        slotProps={{
          body: {
            emptyText: "ไม่พบคนขับรถ",
          },
        }}
      />
      <DriverForm
        initFormData={{
          contact: "",
          licenseType: "",
          name: "",
          surname: "",
        }}
        title="ลงทะเบียนคนขับรถ"
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          submitButton: {
            startIcon: <AddRounded />,
            label: "เพิ่มคนขับรถ",
            onClick: (formData: DriverFormData) =>
              postDriver(formData)
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
