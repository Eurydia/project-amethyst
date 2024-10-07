import { tauriGetPickupRouteReportGeneral } from "$backend/database/get/pickup-routes-general-reports";
import { compareStrings } from "$core/compare";
import { filterObjects } from "$core/filter";
import { PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER } from "$core/transformers/pickup-route-report-general";
import { exportWorkbook } from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralEntry } from "$types/models/pickup-route-report-general";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { BaseSortableTable } from "./BaseSortableTable";
import { BaseSortableTableToolbar } from "./BaseSortableTableToolbar";
import { BaseTypographyLink } from "./BaseTypographyLink";
import { PickupRouteReportGeneralForm } from "./PickupRouteReportGeneralForm";

const DATETIME_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
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
const ROUTE_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "สายรถ",
    compare: (a, b) =>
      compareStrings(a.routeName, b.routeName),
    render: (item) => (
      <BaseTypographyLink
        to={"/pickup-routes/info/" + item.routeId}
      >
        {item.routeName}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "เรื่อง",
    compare: (a, b) => compareStrings(a.title, b.title),
    render: (item) => (
      <BaseTypographyLink
        to={"/pickup-routes/report/general/info/" + item.id}
      >
        {item.title}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: (item) => {
      const topics = item.topics
        .map((topic) => topic.trim().normalize())
        .filter((topic) => topic.length > 0);
      return topics.length === 0 ? (
        <Typography fontStyle="italic">
          ไม่มีหัวข้อที่เกี่ยวข้อง
        </Typography>
      ) : (
        <Typography>{topics.join(", ")}</Typography>
      );
    },
  };

type PickupRouteReportGeneralTableProps = {
  hideRouteColumn?: boolean;
  reportEntries: PickupRouteReportGeneralEntry[];
  slotProps: {
    form: {
      routeSelect: {
        options: PickupRouteModel[];
        disabled?: boolean;
      };
      topicComboBox: {
        options: string[];
      };
    };
  };
};

export const PickupRouteReportGeneralTable: FC<
  PickupRouteReportGeneralTableProps
> = (props) => {
  const { reportEntries, hideRouteColumn, slotProps } =
    props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEntries = filterObjects(
    reportEntries,
    search,
    [
      (item) => item.title,
      (item) => item.topics,
      (item) => item.routeName,
    ]
  );

  const handleExport = async () => {
    if (filteredEntries.length === 0) {
      return;
    }
    const _reports = (
      await Promise.all(
        filteredEntries.map((entry) =>
          tauriGetPickupRouteReportGeneral(entry.id)
        )
      )
    ).filter((report) => report !== null);
    exportWorkbook(_reports, {
      name: "บันทึกเรื่องร้องเรียนสายรถ",
      transformer:
        PICKUP_ROUTE_REPORT_GENERAL_MODEL_TRANSFORMER.toExportData,
    }).then(
      () => toast.success("ดาวน์โหลดสำเร็จ"),
      () => toast.error("ดาวน์โหลดล้มเหลว")
    );
  };

  const databaseHasNoReport = reportEntries.length === 0;
  const databaseHasNoRoute =
    slotProps.form.routeSelect.options.length === 0;

  const headers = hideRouteColumn
    ? [
        DATETIME_HEADER_DEFINITION,
        TITLE_HEADER_DEFINITION,
        TOPIC_HEADER_DEFINITION,
      ]
    : [
        DATETIME_HEADER_DEFINITION,
        TITLE_HEADER_DEFINITION,
        ROUTE_HEADER_DEFINITION,
        TOPIC_HEADER_DEFINITION,
      ];

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder:
              "ค้นหาด้วยสายรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            disabled: databaseHasNoRoute,
            disabledReasons: ["ยังไม่มีสายรถในฐานข้อมูล"],
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
        entries={reportEntries}
        headers={headers}
        databaseIsEmpty={databaseHasNoReport}
      />
      {!databaseHasNoRoute && (
        <PickupRouteReportGeneralForm
          editing={false}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          slotProps={{
            topicComboBox: slotProps.form.topicComboBox,
            routeSelect: slotProps.form.routeSelect,
          }}
        />
      )}
    </Stack>
  );
};
