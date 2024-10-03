import { tauriGetVehicleReportGeneral } from "$backend/database/get/vehicle-general-reports";
import { filterItems } from "$core/filter";
import { VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/vehicle-report-general";
import { exportWorkbook } from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { VehicleModel } from "$types/models/vehicle";
import { VehicleReportGeneralEntry } from "$types/models/vehicle-report-general";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { VehicleReportGeneralForm } from "./VehicleReportGeneralForm";

const DATETIME_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "เวลาและวันที่",
    compare: (a, b) =>
      dayjs(a.datetime).unix() - dayjs(b.datetime).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.datetime)
          .locale("th")
          .format("HH:mm น. DD MMMM YYYY")}
      </Typography>
    ),
  };
const VEHICLE_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "เลขทะเบียน",
    compare: (a, b) =>
      a.vehicle_license_plate.localeCompare(
        b.vehicle_license_plate
      ),
    render: (item) => (
      <BaseTypographyLink
        to={"/vehicles/info/" + item.vehicle_id}
      >
        {item.vehicle_license_plate}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "เรื่อง",
    compare: (a, b) => a.title.localeCompare(b.title),
    render: (item) => (
      <BaseTypographyLink
        to={"/vehicles/report/general/info/" + item.id}
      >
        {item.title}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER_DEFINITION: TableHeaderDefinition<VehicleReportGeneralEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: (item) =>
      item.topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>
          {item.topics
            .map((topic) => topic.normalize().trim())
            .filter((topic) => topic.length > 0)
            .join(", ")}
        </Typography>
      ),
  };

type VehicleReportGeneralTableProps = {
  hideVehicleColumn?: boolean;
  entries: VehicleReportGeneralEntry[];
  slotProps: {
    form: {
      vehicleSelect: {
        disabled?: boolean;
        options: VehicleModel[];
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const VehicleReportGeneralTable: FC<
  VehicleReportGeneralTableProps
> = (props) => {
  const { entries, slotProps, hideVehicleColumn } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleExport = async () => {
    const reportReqs = filteredEntries.map((entry) =>
      tauriGetVehicleReportGeneral(entry.id)
    );
    const reports = (await Promise.all(reportReqs)).filter(
      (report) => report !== null
    );

    // TODO: translate
    exportWorkbook(reports, {
      name: "vehicle general report",
      header: {
        หมายเลขเรื่องร้องเรียน: "",
        วันที่ลงบันทึก: "",
        เรื่อง: "",
        รายละเอียด: "",
        หัวข้อที่เกี่ยวข้อง: "",
        หมายเลขรถรับส่ง: "",
        เลขทะเบียน: "",
      }, // FIXME
      transformer:
        VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("Exported"),
      () => toast.error("Export failed")
    );
  };

  const filteredEntries = filterItems(entries, search, [
    "title",
    "topics",
    "vehicleLicensePlate",
  ]);

  let headers = [
    DATETIME_HEADER_DEFINITION,
    VEHICLE_HEADER_DEFINITION,
    TITLE_HEADER_DEFINITION,
    TOPIC_HEADER_DEFINITION,
  ];
  if (hideVehicleColumn) {
    headers = [
      DATETIME_HEADER_DEFINITION,
      TITLE_HEADER_DEFINITION,
      TOPIC_HEADER_DEFINITION,
    ];
  }
  const databaseHasNoVehicle =
    slotProps.form.vehicleSelect.options.length === 0;
  const databaseIsEmpty = entries.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder:
              "ค้นหาด้วยเลขทะเบียน, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            // TODO: translate
            disabled: databaseHasNoVehicle,
            children: "Add report",
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            disabled: true,
            children: "Import from file",
            onFileSelect: () => {},
          },
          exportButton: {
            children: "Export data",
            onClick: handleExport,
          },
        }}
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        slotProps={{
          body: {
            // TODO: translate
            emptyText: databaseIsEmpty
              ? "Database is empty"
              : "ไม่พบเรื่องร้องเรียน",
          },
        }}
      />
      {slotProps.form.vehicleSelect.options.length > 0 && (
        <VehicleReportGeneralForm
          editing={false}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          slotProps={{
            topicComboBox: slotProps.form.topicComboBox,
            vehcleSelect: slotProps.form.vehicleSelect,
          }}
        />
      )}
    </Stack>
  );
};
