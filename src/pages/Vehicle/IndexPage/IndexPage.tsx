import { BaseSortableTable } from "$components/BaseSortableTable";
import { BaseSortableTableToolbar } from "$components/BaseSortableTableToolbar";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleEntry } from "$types/models/vehicle";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

const HEADER_DEFINITION: TableHeaderDefinition<VehicleEntry>[] =
  [
    {
      label: "ทะเบียนรถ",
      compare: null,
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

export const IndexPage: FC = () => {
  const { vehicleEntries } =
    useLoaderData() as IndexPageLoaderData;

  const navigate = useNavigate();

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

  return (
    <Stack spacing={1}>
      <BaseTypographyLink to="/">
        <KeyboardArrowLeftRounded />
        หน้าแรก
      </BaseTypographyLink>
      <Typography variant="h1">ทะเบียนรถรับส่ง</Typography>
      <BaseSortableTableToolbar
        slotProps={{
          exportButton: {
            label: "ดาวน์โหลด",
            onClick: () => {},
            disabled: true,
          },
          importButton: {
            label: "อัพโหลด",
            onClick: () => {},
            disabled: true,
          },
          searchField: {
            placeholder:
              "ค้นหาด้วยทะเบียนรถ, สายรถ, หรือชื่อนามสกุลคนขับรถ",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            label: "เพิ่มรถรับส่ง",
            onClick: () => navigate("/vehicles/new"),
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
            emptyText: "ไม่พบรถรับส่ง",
          },
        }}
      />
    </Stack>
  );
};
