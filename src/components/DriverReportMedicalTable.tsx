import { tauriGetDriverReportMedical } from "$backend/database/get/driver-medical-reports";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
import { DRIVER_REPORT_MODEL_TRANSFORMER } from "$core/transformers/driver-report";
import { exportWorkbook } from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import { DriverReportEntry } from "$types/models/driver-report";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { DriverReportMedicalForm } from "./DriverReportMedicalForm";

const DATETIME_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
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
const DRIVER_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
  {
    label: "คนขับรถ",
    compare: (a, b) =>
      compareStrings(
        `${a.driver_name} ${a.driver_surname}`,
        `${b.driver_name} ${b.driver_surname}`
      ),
    render: (item) => (
      <BaseTypographyLink
        to={"/drivers/info/" + item.driver_id}
      >
        {item.driver_name} {item.driver_surname}
      </BaseTypographyLink>
    ),
  };

const TITLE_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
  {
    label: "ชื่อเรื่อง",
    compare: (a, b) => compareStrings(a.title, b.title),
    render: (item) => (
      <BaseTypographyLink
        to={"/drivers/report/medical/info/" + item.id}
      >
        {item.title}
      </BaseTypographyLink>
    ),
  };

const TOPICS_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
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

type DriverReportMedicalTableProps = {
  entries: DriverReportEntry[];
  hideDriverColumn?: boolean;
  slotProps: {
    form: {
      driverSelect: {
        options: DriverModel[];
        disabled?: boolean;
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const DriverReportMedicalTable: FC<
  DriverReportMedicalTableProps
> = (props) => {
  const { hideDriverColumn, entries, slotProps } = props;

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredEntries = filterObjects(entries, search, [
    (item) => item.title,
    (item) => item.topics,
    (item) => item.driver_name,
    (item) => item.driver_surname,
  ]);

  const handleExport = async () => {
    const reports = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetDriverReportMedical(entry.id)
        )
      )
    ).filter((report) => report !== null);
    exportWorkbook(reports, {
      name: "บันทึกผลการตรวจสารเสพติดคนขับรถ",
      transformer:
        DRIVER_REPORT_MODEL_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

  const headers = hideDriverColumn
    ? [
        DATETIME_COLUMN_DEFINITION,
        TITLE_COLUMN_DEFINITION,
        TOPICS_COLUMN_DEFINITION,
      ]
    : [
        DATETIME_COLUMN_DEFINITION,
        DRIVER_COLUMN_DEFINITION,
        TITLE_COLUMN_DEFINITION,
        TOPICS_COLUMN_DEFINITION,
      ];

  const databaseHasNoReport = entries.length === 0;
  const databaseHasNoDrivers =
    slotProps.form.driverSelect.options.length === 0;
  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder:
              "ค้นหาด้วยชื่อสกุลคนขับรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
            onChange: setSearch,
            value: search,
          },
          addButton: {
            disabled: databaseHasNoDrivers,
            disabledReasons: ["ยังไม่มีคนขับรถในฐานข้อมูล"],
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
        databaseIsEmpty={databaseHasNoReport}
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
      />
      {!databaseHasNoDrivers && (
        <DriverReportMedicalForm
          editing={false}
          slotProps={{
            topicComboBox: slotProps.form.topicComboBox,
            driverSelect: slotProps.form.driverSelect,
          }}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </Stack>
  );
};
