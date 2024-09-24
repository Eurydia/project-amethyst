import { tauriGetPickupRoute } from "$backend/database/get/pickup-routes";
import { tauriGetPickupRouteReportGeneral } from "$backend/database/get/pickup-routes-general-reports";
import { tauriPostPickupRouteReportGeneral } from "$backend/database/post";
import { filterItems } from "$core/filter";
import {
  exportWorkbook,
  importWorkbook,
} from "$core/workbook";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteModel } from "$types/models/pickup-route";
import {
  PickupRouteReportGeneralEntry,
  PickupRouteReportGeneralExportData,
  PickupRouteReportGeneralFormData,
} from "$types/models/pickup-route-report-general";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC, useState } from "react";
import { useRevalidator } from "react-router-dom";
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
      a.routeName.localeCompare(b.routeName),
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
    compare: (a, b) => a.title.localeCompare(b.title),
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
        .filter((topic) => topic.trim().length > 0);
      if (topics.length === 0) {
        return (
          <Typography fontStyle="italic">ไม่มี</Typography>
        );
      }
      return <Typography>{topics.join(", ")}</Typography>;
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

const importTransformer = async (entry: unknown) => {
  const data = entry as PickupRouteReportGeneralExportData;
  const route = await tauriGetPickupRoute(
    data["รหัสสายรถ"]
  );
  if (route === null) {
    return null;
  }
  const formData: PickupRouteReportGeneralFormData = {
    route,
    datetime: data["วันที่ลงบันทึก"],
    title: data["เรื่อง"],
    content: data["รายละเอียด"],
    topics: data["หัวข้อที่เกี่ยวข้อง"]
      .split(",")
      .map((topic) => topic.trim().normalize())
      .filter((topic) => topic.trim().length > 0),
  };
  return formData;
};

const exportTransformer = async (
  entry: PickupRouteReportGeneralEntry
) => {
  const route = await tauriGetPickupRoute(entry.routeId);
  const report = await tauriGetPickupRouteReportGeneral(
    entry.id
  );
  if (route === null || report === null) {
    return null;
  }
  const data: PickupRouteReportGeneralExportData = {
    รหัสสายรถ: route.id,
    ชื่อสายรถ: route.name,

    รหัสเรื่องร้องเรียน: report.id,
    วันที่ลงบันทึก: report.datetime,
    เรื่อง: report.title,
    รายละเอียด: report.content,
    หัวข้อที่เกี่ยวข้อง: report.topics.replaceAll(
      ",",
      ", "
    ),
  };
  return data;
};

export const PickupRouteReportGeneralTable: FC<
  PickupRouteReportGeneralTableProps
> = (props) => {
  const { reportEntries, hideRouteColumn, slotProps } =
    props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { revalidate } = useRevalidator();

  const databaseHasNoRoute =
    slotProps.form.routeSelect.options.length === 0;
  const filteredEntries = filterItems(
    reportEntries,
    search,
    ["title", "topics", "routeName"]
  );

  let headers = [
    DATETIME_HEADER_DEFINITION,
    TITLE_HEADER_DEFINITION,
    ROUTE_HEADER_DEFINITION,
    TOPIC_HEADER_DEFINITION,
  ];
  if (hideRouteColumn) {
    headers = [
      DATETIME_HEADER_DEFINITION,
      TITLE_HEADER_DEFINITION,
      TOPIC_HEADER_DEFINITION,
    ];
  }

  const handleImport = (file: File) =>
    importWorkbook(file, {
      action: tauriPostPickupRouteReportGeneral,
      cleanup: revalidate,
      transformer: importTransformer,
    });

  const handleExport = () =>
    exportWorkbook(filteredEntries, {
      workbookName: "route general reports", // TODO: translate
      worksheetName: "general reports", // TODO: translate
      header: [
        "รหัสสายรถ",
        "ชื่อสายรถ",
        "รหัสเรื่องร้องเรียน",
        "วันที่ลงบันทึก",
        "เรื่อง",
        "รายละเอียด",
        "หัวข้อที่เกี่ยวข้อง",
      ],
      transformer: exportTransformer,
    });

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
            children: "เพิ่มเรื่องร้องเรียน",
            disabled: databaseHasNoRoute,
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            children: "import reports", // TODO: translate
            onFileSelect: handleImport,
          },
          exportButton: {
            children: "export reports", // TODO: translate
            onClick: handleExport,
          },
        }}
      />
      <BaseSortableTable
        defaultSortByColumn={0}
        defaultSortOrder="desc"
        entries={reportEntries}
        headers={headers}
        slotProps={{
          body: {
            emptyText: databaseHasNoRoute
              ? "Database has no route"
              : "ไม่พบเรื่องร้องเรียน", // TODO: translate,
          },
        }}
      />
      {!databaseHasNoRoute && (
        <PickupRouteReportGeneralForm
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
