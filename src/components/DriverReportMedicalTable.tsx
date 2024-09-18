import { postDriverReportMedical } from "$backend/database/post";
import { filterItems } from "$core/filter";
import { TableHeaderDefinition } from "$types/generics";
import { DriverModel } from "$types/models/driver";
import {
  DriverReportEntry,
  DriverReportFormData,
} from "$types/models/driver-report";
import { AddRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
import { toast } from "react-toastify";
import { BaseInputTextField } from "./BaseInputTextField";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { DriverReportForm } from "./DriverReportForm";

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
    render: (item) =>
      item.topics.length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{item.topics.join(", ")}</Typography>
      ),
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

  const { revalidate } = useRevalidator();
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
    DRIVER_COLUMN_DEFINITION,
    TITLE_COLUMN_DEFINITION,
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
      <Stack direction="row">
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={() => setDialogOpen(true)}
        >
          เพิ่มผลตรวจสารเสพติด
        </Button>
      </Stack>
      <BaseInputTextField
        value={search}
        onChange={setSearch}
        placeholder="ค้นหาด้วยชื่อสกุลคนขับรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง"
      />
      <BaseSortableTable
        slotProps={{
          body: {
            emptyText: `ไม่พบผลการตรวจสารเสพติด`,
          },
        }}
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={filteredEntries}
        headers={headers}
      />
      {slotProps.form.driverSelect.options.length > 0 && (
        <DriverReportForm
          initFormData={{
            title: "",
            content: "",
            topics: [],
            datetime: dayjs().format(),
            driver: slotProps.form.driverSelect.options[0],
          }}
          title="เพิ่มผลตรวจสารถเสพติด"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          slotProps={{
            submitButton: {
              label: "เพิ่มผลตรวจ",
              startIcon: <AddRounded />,
              onClick: (formData: DriverReportFormData) =>
                postDriverReportMedical(formData)
                  .then(
                    () => {
                      toast.success("เพิ่มผลตรวจสำเร็จ");
                      revalidate();
                    },
                    () => toast.error("เพิ่มผลตรวจล้มเหลว"),
                  )
                  .finally(() => setDialogOpen(false)),
            },
            driverSelect: slotProps.form.driverSelect,
            topicComboBox: slotProps.form.topicComboBox,
          }}
        />
      )}
    </Stack>
  );
};
