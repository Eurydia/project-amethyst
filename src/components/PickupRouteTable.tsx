import { postPickupRoute } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteEntry } from "$types/models/pickup-route";
import { AddRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Collapse,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
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
      compare: (a, b) => a.name.localeCompare(b.name),
      render: (item) => (
        <BaseTypographyLink
          to={"/pickup-routes/info/" + item.id}
        >
          {item.name} ({item.id})
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
  props,
) => {
  const { routeEntries } = props;
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { revalidate } = useRevalidator();
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
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder:
              "ค้นหาด้วยสายรถ, เลขทะเบียน, หรือชื่อสกุลคนขับรถ",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            // TODO: translate
            children: "register route",
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            children: "register from file",
            onClick: () => {},
          },
          exportButton: {
            children: "export routes",
            onClick: () => {},
          },
        }}
      />
      <Collapse
        in={
          routeEntries.length === 0 ||
          filteredEntries.length === 0
        }
      >
        <Alert severity="warning" variant="outlined">
          <AlertTitle>Warning</AlertTitle>
          <Typography>
            The export feature is disabled because no pickup
            route has been selected to export.
          </Typography>
        </Alert>
      </Collapse>
      <BaseSortableTable
        defaultSortOrder="asc"
        defaultSortByColumn={0}
        headers={HEADER_DEFINITION}
        entries={filteredEntries}
        slotProps={{
          body: {
            //TODO: translate
            emptyText:
              routeEntries.length === 0
                ? "No routes registered in the system"
                : "No matching routes",
          },
        }}
      />
      <PickupRouteForm
        //TODO: translate
        title="Register a new pickup route"
        open={dialogOpen}
        initFormData={{
          arrivalTime: dayjs()
            .startOf("day")
            .format("HH:mm"),
          departureTime: dayjs()
            .endOf("day")
            .format("HH:mm"),
          name: "",
        }}
        onClose={() => setDialogOpen(false)}
        slotProps={{
          submitButton: {
            //TODO: translate
            label: "register",
            startIcon: <AddRounded />,
            onClick: (formData) =>
              postPickupRoute(formData)
                .then(
                  () => {
                    toast.success(
                      "Registration successful",
                    );
                    revalidate();
                  },
                  () => toast.error("Registration failed"),
                )
                .finally(() => setDialogOpen(false)),
          },
        }}
      />
    </Stack>
  );
};
