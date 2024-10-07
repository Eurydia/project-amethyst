import { tauriGetVehicleReportGeneral } from "$backend/database/get/vehicle-general-reports";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
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
      compareStrings(
        a.vehicle_license_plate,
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
    compare: (a, b) => compareStrings(a.title, b.title),
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
    render: (item) => {
      const topics = item.topics
        .map((topic) => topic.trim())
        .filter((topic) => topic.length > 0);

      return topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{topics.join(", ")}</Typography>
      );
    },
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
    if (filteredEntries.length === 0) {
      return;
    }
    const reports = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetVehicleReportGeneral(entry.id)
        )
      )
    ).filter((report) => report !== null);

    exportWorkbook(reports, {
      name: "บันทึกเรื่องร้องเรียนรถรับส่ง",
      transformer:
        VEHICLE_REPORT_GENERAL_MODEL_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

  const filteredEntries = filterObjects(entries, search, [
    (item) => item.vehicle_license_plate,
    (item) => item.topics,
    (item) => item.title,
  ]);

  const headers = hideVehicleColumn
    ? [
        DATETIME_HEADER_DEFINITION,
        TITLE_HEADER_DEFINITION,
        TOPIC_HEADER_DEFINITION,
      ]
    : [
        DATETIME_HEADER_DEFINITION,
        VEHICLE_HEADER_DEFINITION,
        TITLE_HEADER_DEFINITION,
        TOPIC_HEADER_DEFINITION,
      ];
  const databaseHasNoVehicle =
    slotProps.form.vehicleSelect.options.length === 0;
  const databaseHasNoReport = entries.length === 0;

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
            disabled: databaseHasNoVehicle,
            disabledReasons: [
              "ยังไม่มีรถรับส่งในฐานข้อมูล",
            ],
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            hidden: true,
          },
          exportButton: {
            disabled: filteredEntries.length === 0,
            onClick: handleExport,
          },
        }}
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        databaseIsEmpty={databaseHasNoReport}
      />
      {!databaseHasNoVehicle && (
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
