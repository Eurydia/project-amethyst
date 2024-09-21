import { getPickupRoute } from "$backend/database/get/pickup-routes";
import { postPickupRoute } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { PICKUP_ROUTE_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-model";
import { TableHeaderDefinition } from "$types/generics";
import {
  PickupRouteEntry,
  PickupRouteExportData,
} from "$types/models/pickup-route";
import { AddRounded } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { BaseInputFileDropzone } from "./BaseInputFileDropzone";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { PickupRouteForm } from "./PickupRouteForm";

const HEADER_DEFINITION: TableHeaderDefinition<PickupRouteEntry>[] = [
  {
    label: "สายรถ",
    compare: (a, b) => a.name.localeCompare(b.name),
    render: (item) => (
      <BaseTypographyLink to={"/pickup-routes/info/" + item.id}>
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
export const PickupRouteTable: FC<PickupRouteTableProps> = (props) => {
  const { routeEntries } = props;

  const [search, setSearch] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const { revalidate } = useRevalidator();
  const filteredEntries = filterItems(routeEntries, search, [
    "name",
    "vehicles.*.licensePlate",
    "drivers.*.name",
    "drivers.*.surname",
  ]);

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder: "ค้นหาด้วยสายรถ, เลขทะเบียน, หรือชื่อสกุลคนขับรถ",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            children: "register route", // TODO: translate
            onClick: () => setFormDialogOpen(true),
          },
          importButton: {
            children: "register from file", // TODO: translate
            onClick: () => setImportDialogOpen(true),
          },
          exportButton: {
            children: "export routes", // TODO: translate
            onClick: async () => {
              const routes = await Promise.all(
                filteredEntries
                  .map((entry) => entry.id)
                  .map((routeId) => getPickupRoute(routeId))
              );
              const exportedRoutes = routes
                .filter((route) => route !== null)
                .toSorted((a, b) => a.id - b.id)
                .map(PICKUP_ROUTE_MODEL_TRANSFORMER.toPickupRouteExportData);
              const header: (keyof PickupRouteExportData)[] = [
                "เลขรหัส",
                "ชื่อสาย",
                "เวลารับเข้า",
                "เวลารับออก",
              ];
              const worksheet = XLSX.utils.json_to_sheet(exportedRoutes, {
                header,
              });

              const workbook = XLSX.utils.book_new();

              XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                "routes" // TODO: translate work sheet name
              );

              XLSX.writeFile(
                workbook,
                "routes.xlsx" // TODO: translate work book name
              );
            },
          },
        }}
      />
      <Collapse in={routeEntries.length === 0 || filteredEntries.length === 0}>
        <Alert severity="warning" variant="outlined">
          <AlertTitle>
            {/* TODO: translate */}
            Warning
          </AlertTitle>
          <Typography>
            {/* TODO: translate */}
            The export feature is disabled because no pickup route has been
            selected to export.
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
            emptyText:
              routeEntries.length === 0
                ? "No routes registered in the system"
                : "No matching routes", //TODO: translate
          },
        }}
      />
      <PickupRouteForm
        title="Register a new pickup route" //TODO: translate
        open={formDialogOpen}
        initFormData={{
          name: "",
          arrivalTime: dayjs().startOf("day").format("HH:mm"),
          departureTime: dayjs().endOf("day").format("HH:mm"),
        }}
        onClose={() => setFormDialogOpen(false)}
        slotProps={{
          submitButton: {
            label: "register", // TODO: translate
            startIcon: <AddRounded />,
            onClick: (formData) =>
              postPickupRoute(formData)
                .then(
                  () => {
                    toast.success(
                      "Registration successful" // TODO: translate
                    );
                    revalidate();
                  },
                  () =>
                    toast.error(
                      "Registration failed" // TODO: translate
                    )
                )
                .finally(() => setFormDialogOpen(false)),
          },
        }}
      />
      <Dialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      >
        <DialogTitle>
          Register drivers from file{/* TODO: translate */}
        </DialogTitle>
        <DialogContent>
          <BaseInputFileDropzone onFileAccepted={setFiles} />
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={async () => {
              for (const file of files) {
                const workbook = XLSX.read(await file.arrayBuffer());
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const entries =
                  XLSX.utils.sheet_to_json<Omit<PickupRouteExportData, "id">>(
                    sheet
                  );
                const req = entries.map((entry) =>
                  postPickupRoute({
                    arrivalTime: entry["เวลารับเข้า"],
                    departureTime: entry["เวลารับออก"],
                    name: entry["ชื่อสาย"],
                  })
                );
                await Promise.allSettled(req)
                  .then(
                    (results) => {
                      const count = results.filter(
                        (result) => result.status === "fulfilled"
                      ).length;
                      toast.success(
                        `Added ${count} routes` // TODO: translate
                      );
                      revalidate();
                    },
                    () =>
                      toast.error(
                        "Registration failed" // TODO: translate
                      )
                  )
                  .finally(() => {
                    setImportDialogOpen(false);
                    setFiles([]);
                  });
              }
            }}
          >
            Add {/* TODO: translate */}
          </Button>
          <Button variant="outlined" onClick={() => setImportDialogOpen(false)}>
            cancel
          </Button>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
