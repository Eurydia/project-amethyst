import { BaseSortableTable } from "$components/BaseSortableTable";
import { BaseSortableTableToolbar } from "$components/BaseSortableTableToolbar";
import { BaseTypographyLink } from "$components/BaseTypographyLink";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { KeyboardArrowLeftRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { IndexPageLoaderData } from "./loader";

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

export const IndexPage: FC = () => {
  const { routeEntries } =
    useLoaderData() as IndexPageLoaderData;

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredEntries = filterItems(
    routeEntries,
    search,
    [
      "name",
      "vehicles.*.licensePlate",
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
      <Typography variant="h1">รายชื่อสายรถ</Typography>
      <Stack spacing={1}>
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
                "ค้นหาด้วยสายรถ, เลขทะเบียน, หรือชื่อสกุลคนขับรถ",
              value: search,
              onChange: setSearch,
            },
            addButton: {
              label: "เพิ่มสายรถ",
              onClick: () => navigate("/pickup-routes/new"),
            },
          }}
        />
        <BaseSortableTable
          defaultSortOrder="asc"
          defaultSortByColumn={0}
          headers={HEADER_DEFINITION}
          entries={filteredEntries}
          slotProps={{
            body: {
              emptyText: "ไม่พบสายรถ",
            },
          }}
        />
      </Stack>
    </Stack>
  );
};
