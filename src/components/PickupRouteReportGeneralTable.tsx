/** @format */

import { filterItems } from "$core/filter";
import { useExportPickupRouteReportGeneral } from "$hooks/useExportPickupRouteReportGeneral";
import { useImportPickupRouteReportGeneral } from "$hooks/useImportPickupRouteReportGeneral";
import { TableHeaderDefinition } from "$types/generics";
import { PickupRouteModel } from "$types/models/pickup-route";
import { PickupRouteReportGeneralEntry } from "$types/models/pickup-route-report-general";
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
    compare: (a, b) => dayjs(a.datetime).unix() - dayjs(b.datetime).unix(),
    render: (item) => (
      <Typography>
        {dayjs(item.datetime).locale("th").format("HH:mm น. DD MMMM YYYY")}
      </Typography>
    ),
  };
const ROUTE_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "สายรถ",
    compare: (a, b) => a.routeName.localeCompare(b.routeName),
    render: (item) => (
      <BaseTypographyLink to={"/pickup-routes/info/" + item.routeId}>
        {item.routeName}
      </BaseTypographyLink>
    ),
  };
const TITLE_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "เรื่อง",
    compare: (a, b) => a.title.localeCompare(b.title),
    render: (item) => (
      <BaseTypographyLink to={"/pickup-routes/report/general/info/" + item.id}>
        {item.title}
      </BaseTypographyLink>
    ),
  };
const TOPIC_HEADER_DEFINITION: TableHeaderDefinition<PickupRouteReportGeneralEntry> =
  {
    label: "หัวข้อที่เกี่ยวข้อง",
    compare: null,
    render: (item) =>
      item.topics.filter((topic) => topic.trim().length > 0).length === 0 ? (
        <Typography fontStyle="italic">ไม่มี</Typography>
      ) : (
        <Typography>{item.topics.join(", ")}</Typography>
      ),
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
  const { reportEntries, hideRouteColumn, slotProps } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const importReports = useImportPickupRouteReportGeneral();
  const exportReports = useExportPickupRouteReportGeneral();
  const { revalidate } = useRevalidator();

  const databaseHasNoRoute = slotProps.form.routeSelect.options.length === 0;
  const filteredEntries = filterItems(reportEntries, search, [
    "title",
    "topics",
    "routeName",
  ]);

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

  return (
    <Stack spacing={1}>
      <BaseSortableTableToolbar
        slotProps={{
          searchField: {
            placeholder: "ค้นหาด้วยสายรถ, ชื่อเรื่อง, หรือหัวข้อที่เกี่ยวข้อง",
            value: search,
            onChange: setSearch,
          },
          addButton: {
            children: "เพิ่มเรื่องร้องเรียน",
            disabled: databaseHasNoRoute,
            onClick: () => setDialogOpen(true),
          },
          importButton: {
            disabled: undefined,
            children: "import reports", // TODO: translate
            onFileSelect: (file) => importReports(file).finally(revalidate),
          },
          exportButton: {
            children: "export reports", // TODO: translate
            onClick: () => exportReports(filteredEntries),
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
