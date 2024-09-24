/** @format */

import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import { DriverReportEntry } from "$types/models/driver-report";
import {
  AddRounded,
  SearchRounded,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseSortableTable } from "./BaseSortableTable";
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

  return (
    <Stack spacing={1}>
      <Stack>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          startIcon={<AddRounded />}
        >
          เพิ่มเรื่องร้องเรียน
        </Button>
      </Stack>
      <BaseInputTextField
        value={search}
        onChange={setSearch}
        placeholder="ค้นหาด้วยชื่อสกุลคนขับรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง"
        startIcon={<SearchRounded />}
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
        slotProps={{
          body: {
            emptyText: `ไม่พบเรื่องร้องเรียน`,
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
