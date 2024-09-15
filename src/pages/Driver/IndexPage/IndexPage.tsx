import { BaseSortableTable } from "$components/BaseSortableTable";
import { BaseSortableTableToolbar } from "$components/BaseSortableTableToolbar";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverEntry } from "$types/models/driver";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

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

export const IndexPage: FC = () => {
  const { driverEntries } =
    useLoaderData() as IndexPageLoaderData;

  const navigate = useNavigate();
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
      <BaseTypographyLink to="/">
        <KeyboardArrowLeftRounded />
        หน้าแรก
      </BaseTypographyLink>
      <Typography variant="h1">รายชื่อคนขับรถ</Typography>
      <Stack spacing={1}>
        <BaseSortableTableToolbar
          slotProps={{
            exportButton: {
              disabled: true,
              label: `ดาวน์โหลดรายชื่อ`,
              onClick: () => {},
            },
            importButton: {
              disabled: true,
              label: `อัพโหลดรายชื่อ`,
              onClick: () => {},
            },
            searchField: {
              placeholder: `ค้นหาด้วยชื่อสกุลคนขับรถ, เลขทะเบียนรถ, หรือสายรถ`,
              value: search,
              onChange: setSearch,
            },
            addButton: {
              label: `เพิ่มคนขับรถ`,
              onClick: () => navigate("/drivers/new"),
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
              emptyText: "ไม่พบคนขับรถ",
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
