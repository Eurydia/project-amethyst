import { tauriGetDriverReportGeneral } from "$backend/database/get/driver-general-reports";
import { filterItems } from "$core/filter";
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
import { DriverReportGeneralForm } from "./DriverReportGeneralForm";

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
      a.driver_name.localeCompare(b.driver_name),
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
    compare: (a, b) => a.title.localeCompare(b.title),
    render: (item) => (
      <BaseTypographyLink to={"./info/" + item.id}>
        {item.title}
      </BaseTypographyLink>
    ),
  };

const TOPICS_COLUMN_DEFINITION: TableHeaderDefinition<DriverReportEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: (item) =>
      item.topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{item.topics.join(", ")}</Typography>
      ),
  };
type DriverReportGeneralTableProps = {
  hideDriverColumn?: boolean;
  entries: DriverReportEntry[];
  slotProps: {
    form: {
      driverSelect: {
        disabled?: boolean;
        options: DriverModel[];
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};
export const DriverReportGeneralTable: FC<
  DriverReportGeneralTableProps
> = (props) => {
  const { hideDriverColumn, entries, slotProps } = props;

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const filteredEntries = filterItems(entries, search, [
    "title",
    "topics",
    "driverName",
    "driverSurname",
  ]);

  let headers = [
    DATETIME_COLUMN_DEFINITION,
    TITLE_COLUMN_DEFINITION,
    DRIVER_COLUMN_DEFINITION,
    TOPICS_COLUMN_DEFINITION,
  ];
  if (hideDriverColumn) {
    headers = [
      DATETIME_COLUMN_DEFINITION,
      TITLE_COLUMN_DEFINITION,
      TOPICS_COLUMN_DEFINITION,
    ];
  }

  const handleExport = async () => {
    const reports = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetDriverReportGeneral(entry.id)
        )
      )
    ).filter((report) => report !== null);

    exportWorkbook(reports, {
      header: [], // FIXME,
      name: "เรื่องร้องเรียนคนขับรถ",
      transformer:
        DRIVER_REPORT_MODEL_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดา่วน์โหลดล้มเหลว")
    );
  };

  const databaseIsEmpty = entries.length === 0;
  const databaseHasNoDriver =
    slotProps.form.driverSelect.options.length === 0;

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            onChange: setSearch,
            value: search,
            placeholder:
              "ค้นหาด้วยชื่อสกุลคนขับรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
          },
          addButton: {
            disabled: databaseHasNoDriver,
            children: "เพิ่มเรื่องร้องเรียน",
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            disabled: true,
            children: "นำเข้าข้อมูล",
            onFileSelect: () => {},
          },
          exportButton: {
            children: "ดาวน์โหลดสำเนา",
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
            emptyText: databaseIsEmpty
              ? "ฐานข้อมูลว่าง"
              : "ไม่พบเรื่องร้องเรียนที่ค้นหา",
          },
        }}
      />
      {slotProps.form.driverSelect.options.length > 0 && (
        <DriverReportGeneralForm
          slotProps={{
            driverSelect: slotProps.form.driverSelect,
            topicComboBox: slotProps.form.topicComboBox,
          }}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </Stack>
  );
};
