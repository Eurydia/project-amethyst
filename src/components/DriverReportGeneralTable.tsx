/** @format */

import { tauriPostDriverReportGeneral } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { DRIVER_REPORT_VALIDATOR } from "$core/validators/driver-report";
import { importWorkbook } from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import { DriverReportEntry } from "$types/models/driver-report";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
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
      a.driverName.localeCompare(b.driverName),
    render: (item) => (
      <BaseTypographyLink
        to={"/drivers/info/" + item.driverId}
      >
        {item.driverName} {item.driverSurname}
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

  const { revalidate } = useRevalidator();

  const handleImport = async (file: File) => {
    importWorkbook(file, {
      validator: DRIVER_REPORT_VALIDATOR.validate,
      action: tauriPostDriverReportGeneral,
    }).then(
      // TODO: translate
      () => {
        toast.success("imported");
        revalidate();
      },
      () => toast.error("import failed")
    );
  };

  const handleExport = () => {};

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
            children: "Import", // TODO: translate
            onFileSelect: function (file: File): void {
              throw new Error("Function not implemented.");
            },
          },
          exportButton: {
            children: "",
            onClick: function (): void {
              throw new Error("Function not implemented.");
            },
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
              : `ไม่พบเรื่องร้องเรียน`,
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
